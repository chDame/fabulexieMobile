import store, { AppThunk } from '../store';
import { setCurrentDocument, setNbPage } from '../store/features/document/slice';
import { remoteLoading, remoteDocsLoadSuccess, remoteSpacesLoadSuccess, remoteDirLoadSuccess, remoteLoadingFail, setSpace, setDirectory } from '../store/features/remoteDocs/slice';
import { localDocsLoading, localDocsLoadSuccess, localDocsFail, addLocalDocument, removeLocalDocument, updateDocument } from '../store/features/localDocs/slice';
import { IDocument, ISpaceAccess, IDirectory, ISpace } from '../store/model';
import api from './api';
import { AsyncStorage, Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { env } from '../env';
import authService from './AuthService';

export class DocService {

  progressions:Array<number> = [];

  getSpaceId = ():number|null => {
    let space:ISpace|null = store.getState().documents.currentSpace;
    return space ? space.id : null;
  }
  getDirectoryId = ():number|null => {
    let dir:IDirectory|null = store.getState().documents.currentDir;
    return dir ? dir.id : null;
  }
  getDirParent = ():IDirectory|null => {
    let dir:IDirectory|null = store.getState().documents.currentDir;
    return dir ? dir.parent : null;
  }
  getDocTitle = ():string => {
    let doc:IDocument|null = store.getState().doc.doc;
    return doc ? (doc.title ? doc.title : doc.name) : '';
  }
  getCover = (token: string):string => {
    return `${env.backend}/documents/${token}/cover.png`;
  }
  getSpaceUrl = ():string => {
    return '/users/'+authService.getUserId()+'/spaces';
  }
  getDirectoriesUrl = ():string => {
    let dirId:number|null = this.getDirectoryId();
    if (dirId==null) {
      return this.getSpaceUrl()+'/'+this.getSpaceId()+'/directories';
    }
    return this.getSpaceUrl()+'/'+this.getSpaceId()+'/directories/'+dirId;
  }
  getDocumentsUrl = ():string => {
    let dirId:number|null = this.getDirectoryId();
    if (dirId==null) {
      return this.getSpaceUrl()+'/'+this.getSpaceId()+'/documents';
    }
    return this.getSpaceUrl()+'/'+this.getSpaceId()+'/directories/'+dirId+'/documents';
  }
  getDocumentUrl = (doc: IDocument):string => {
    return this.getDocumentsUrl()+'/'+doc.id;
  }

  getNewDoc = async (doc:IDocument):Promise<IDocument> => {
    const {data} =  await api.get<IDocument>(this.getDocumentUrl(doc));
    return data;
  }
  
  setDocument = (doc:IDocument): AppThunk => async dispatch => {
    let clone = Object.assign(doc);
    if (doc.filePath) {
      clone.lastAccess = Date.now();
      dispatch(updateDocument(clone));
      AsyncStorage.setItem(`@DocumentStore:${doc.id}`, JSON.stringify(clone));
    }
    dispatch(setCurrentDocument(clone));
  };

  setTotalPages = (nbPages:number): AppThunk => async dispatch => {
      dispatch(setNbPage(nbPages));
  };

  fetchRemoteSpaces = (): AppThunk => async dispatch => {
    try {
      dispatch(remoteLoading());
      const {data} = await api.get<ISpaceAccess[]>(this.getSpaceUrl());
      dispatch(remoteSpacesLoadSuccess(data));
    } catch (err) {
      dispatch(remoteLoadingFail(err.toString()));
    }
  }

  setCurrentSpace = (space: ISpace): AppThunk => async dispatch => {
    try {
      dispatch(setSpace(space));
      dispatch(setDirectory(null));
      dispatch(this.fetchRemoteDirs());
      dispatch(this.fetchRemoteDocuments());
    } catch (err) {
      dispatch(remoteLoadingFail(err.toString()));
    }
  }
  setCurrentDir = (dir: IDirectory|null): AppThunk => async dispatch => {
    try {
      dispatch(setDirectory(dir));
      dispatch(this.fetchRemoteDirs());
      dispatch(this.fetchRemoteDocuments());
    } catch (err) {
      dispatch(remoteLoadingFail(err.toString()));
    }
  }

  fetchRemoteDirs = (): AppThunk => async dispatch => {
    try {
      dispatch(remoteLoading());

      const {data} = await api.get<IDirectory[]>(this.getDirectoriesUrl());

      dispatch(remoteDirLoadSuccess(data));
    } catch (err) {
      dispatch(remoteLoadingFail(err.toString()));
    }
  }


  fetchRemoteDocuments = (): AppThunk => async dispatch => {
    try {
      dispatch(remoteLoading());

      const {data} = await api.get<IDocument[]>(this.getDocumentsUrl());

      dispatch(remoteDocsLoadSuccess(data));
    } catch (err) {
      dispatch(remoteLoadingFail(err.toString()));
    }
  }

  fetchLocalDocuments = (): AppThunk => async dispatch => {
    try {
      dispatch(localDocsLoading());
    
      AsyncStorage.getAllKeys((err, keys) => {
        if (keys!=null) {
          AsyncStorage.multiGet(keys, (err, stores) => {
            if (stores) {
              let docs = new Array<IDocument>();
              stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];
      
                if (key.startsWith("@DocumentStore")) {
                  try{
                    let infoDoc: IDocument = JSON.parse(value);
                    docs.push(infoDoc);
                  } catch (e) {
  
                  }
                }
              });
              docs.sort((a, b) => (a.lastAccess && b.lastAccess) ? b.lastAccess - a.lastAccess : -1);
              dispatch(localDocsLoadSuccess(docs));
            }
          });
        }
      });
      } catch (err) {
        dispatch(localDocsFail(err.toString()));
      }
    };

    storeProgression = (doc: IDocument|null, currentPage: number): AppThunk => async dispatch => {
      if (doc!=null) {
        let local = await AsyncStorage.getItem(`@DocumentStore:${doc.id}`);
        if (local) {
          let clone:IDocument = JSON.parse(local);
          clone.progression = currentPage;
          dispatch(addLocalDocument(clone));
          AsyncStorage.setItem(`@DocumentStore:${doc.id}`, JSON.stringify(clone));
        } else {
          this.progressions[doc.id] = currentPage;
        }
      }
    }
    deleteLocal = (doc:IDocument): AppThunk => async dispatch => {
      if (doc.filePath) {
        await AsyncStorage.removeItem(`@DocumentStore:${doc.id}`);
        await FileSystem.deleteAsync(doc.filePath);
        dispatch(removeLocalDocument(doc));
      }
    }
    storeDocument = (doc:IDocument, nbPage: number): AppThunk => async dispatch => {
      try {
        let filePath = `${FileSystem.documentDirectory}${doc.id}.html`;
        let coverPath = `${FileSystem.documentDirectory}${doc.id}.png`;
        let fileUrl = `${env.backend}/documents/${doc.accessToken}/saved/reader/${Dimensions.get('window').width}/${Dimensions.get('window').height-120}`;
        
        let downloadOpenDys = FileSystem.createDownloadResumable(
          `${env.backend}/openDys/opendys.css`,
          `${FileSystem.documentDirectory}openDys/opendys.css`
        );
        let downloadOpenDysReg = FileSystem.createDownloadResumable(
          `${env.backend}/openDys/OpenDyslexic-Regular.otf`,
          `${FileSystem.documentDirectory}openDys/OpenDyslexic-Regular.otf`
        );
        let downloadOpenDysBold = FileSystem.createDownloadResumable(
          `${env.backend}/openDys/OpenDyslexic-Bold.otf`,
          `${FileSystem.documentDirectory}openDys/OpenDyslexic-Bold.otf`
        );
        let downloadOpenDysItalic = FileSystem.createDownloadResumable(
          `${env.backend}/openDys/OpenDyslexic-Italic.otf`,
          `${FileSystem.documentDirectory}openDys/OpenDyslexic-Italic.otf`
        );
        let downloadOpenDysBoldItalic = FileSystem.createDownloadResumable(
          `${env.backend}/openDys/OpenDyslexic-BoldItalic.otf`,
          `${FileSystem.documentDirectory}openDys/OpenDyslexic-BoldItalic.otf`
        );
        const fileExists:FileSystem.FileInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}openDys/opendys.css`);
        if (!fileExists.exists) {
          await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}openDys`);
          downloadOpenDys.downloadAsync();
          downloadOpenDysReg.downloadAsync();
          downloadOpenDysBold.downloadAsync();
          downloadOpenDysItalic.downloadAsync();
          downloadOpenDysBoldItalic.downloadAsync();
        }
        let downloadBook = FileSystem.createDownloadResumable(
          fileUrl,
          filePath
        );

        let downloadCover= FileSystem.createDownloadResumable(
          this.getCover(doc.accessToken),
          coverPath
        );
      
        await downloadBook.downloadAsync();
        await downloadCover.downloadAsync();
  
        const document: IDocument = {id: doc.id, name: doc.name, description: doc.description, 
          accessToken: doc.accessToken, title: doc.title, nbPages: nbPage, filePath: filePath, 
          coverPath: coverPath, 
          lastAccess: Date.now(),
          progression: (this.progressions[doc.id] ? this.progressions[doc.id] : 1)};

        await AsyncStorage.setItem(`@DocumentStore:${doc.id}`, JSON.stringify(document));
        dispatch(addLocalDocument(document));
      } catch (error) {
        console.warn(error);
      }
    };
}

const docService = new DocService();

export default docService;