import store, { AppThunk } from '../store';
import { setCurrentDocument, setNbPage } from '../store/features/document/slice';
import { remoteLoading, remoteDocsLoadSuccess, remoteSpacesLoadSuccess, remoteDirLoadSuccess, remoteLoadingFail, setSpace, setDirectory } from '../store/features/remoteDocs/slice';
import { localDocsLoading, localDocsLoadSuccess, localDocsFail, addLocalDocument } from '../store/features/localDocs/slice';
import { IDocument, ISpaceAccess, IDirectory, ISpace } from '../store/model';
import api from './api';
import { AsyncStorage, Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { env } from '../env';
import authService from './AuthService';

export class DocService {
  getSpaceId = ():number|null => {
    let space:ISpace|null = store.getState().documents.currentSpace;
    return space ? space.id : null;
  }
  getDirectoryId = ():number|null => {
    let dir:IDirectory|null = store.getState().documents.currentDir;
    return dir ? dir.id : null;
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
  setDocument = (doc:IDocument): AppThunk => async dispatch => {
    dispatch(setCurrentDocument(doc));
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
  setCurrentDir = (dir: IDirectory): AppThunk => async dispatch => {
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
                    let infoDoc = JSON.parse(value);
                    docs.push(infoDoc);
                  } catch (e) {
  
                  }
                }
              });
              dispatch(localDocsLoadSuccess(docs));
            }
          });
        }
      });
      } catch (err) {
        dispatch(localDocsFail(err.toString()));
      }
    };

    storeDocument = (doc:IDocument, nbPage: number): AppThunk => async dispatch => {
      try {
        let filePath = `${FileSystem.documentDirectory}${doc.id}.html`;
        
        let fileUrl = `${env.backend}/documents/${doc.accessToken}/saved/reader/${Dimensions.get('window').width}/${Dimensions.get('window').height-120}`;
        
        let downloadObject = FileSystem.createDownloadResumable(
          fileUrl,
          filePath
        );
      
        await downloadObject.downloadAsync();
  
        const document: IDocument = {id: doc.id, name: doc.name, description: doc.description, 
          accessToken: doc.accessToken, title: doc.title, nbPages: nbPage, filePath: filePath};

        await AsyncStorage.setItem(`@DocumentStore:${doc.id}`, JSON.stringify(document));
        dispatch(addLocalDocument(document));
      } catch (error) {
        console.warn(error);
      }
    };
}

const docService = new DocService();

export default docService;