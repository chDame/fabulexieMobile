import { AppThunk } from '../store';
import { setCurrentDocument, setNbPage } from '../store/features/document/slice';
import { remoteDocsLoading, remoteDocsLoadSuccess, remoteDocsFail } from '../store/features/remoteDocs/slice';
import { localDocsLoading, localDocsLoadSuccess, localDocsFail, addLocalDocument } from '../store/features/localDocs/slice';
import { IDocument } from '../store/model';
import api from './api';
import { AsyncStorage, Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { env } from '../env';

export class DocService {
     
  setDocument = (doc:IDocument): AppThunk => async dispatch => {
    dispatch(setCurrentDocument(doc));
  };

  setTotalPages = (nbPages:number): AppThunk => async dispatch => {
      dispatch(setNbPage(nbPages));
  };

  
  fetchRemoteDocuments = (): AppThunk => async dispatch => {
    try {
      dispatch(remoteDocsLoading());

      const {data} = await api.get<any>('/documents');

      dispatch(remoteDocsLoadSuccess(data));
    } catch (err) {
      dispatch(remoteDocsFail(err.toString()));
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
        console.log( JSON.stringify(doc));
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