import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument} from '../../model';
import { AsyncStorage } from 'react-native';
import {AppThunk} from '../../index';

export interface DocumentListState {
  data: IDocument[];
  loading: boolean;
  error: string | null;
}

export const initialState: DocumentListState = {
  data: [],
  loading: false,
  error: null,
};

const availableDocsSlice = createSlice({
  name: 'availableDocsSlice',
  initialState,
  reducers: {
    loadingStart: (state: DocumentListState) => {
      state.loading = true;
    },
    docsLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<IDocument[]>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    addDocument: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      state.data.push(action.payload);
    },
    fail: (state: DocumentListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadingStart,
  docsLoadSuccess,
  addDocument,
  fail,
} = availableDocsSlice.actions;

export default availableDocsSlice.reducer;

export const fetchDocuments = (): AppThunk => async dispatch => {
  try {
    dispatch(loadingStart());
	
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
            dispatch(docsLoadSuccess(docs));
          }
        });
      }
    });
    } catch (err) {
      dispatch(fail(err.toString()));
    }
  };
