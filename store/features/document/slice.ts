import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Navigation from '../../../services/Navigation';
import {IDocument} from '../documentList/slice'
import api from '../../../services/api';
import {AppThunk} from '../../index';



export interface DocumentState {
  doc: IDocument | null;
  loading: boolean;
  data: any;
  nbPage: number;
  currentPage: number;
  error: string | null;
}

export const initialState: DocumentState = {
  doc: null,
  loading: false,
  data: null,
  nbPage: 1,
  currentPage: 1,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCurrentDocument: (
      state: DocumentState, 
      doc: PayloadAction<IDocument>
    ) => {
      state.doc = doc.payload;
      state.data = null;
    },
    loadingDocStart: (
      state: DocumentState,
    ) => {
      state.loading = true;
    },
    docFail: (state: DocumentState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    docLoadSuccess: (
      state: DocumentState,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.data = action.payload;
      console.log(state.data);
      let reader = new FileReader();
      /*console.log(reader);
      reader.readAsArrayBuffer(state.data);
      console.log(state.data);
      reader.onloadend = function(){
        console.log('gloups');
          var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          console.log('Number of Pages:',count );
          state.nbPage=count;
      }*/
    },
    setNbPage: (
      state: DocumentState,
      count: PayloadAction<number>,
    ) => {
      state.nbPage=count.payload;
      state.loading = false;
    },
  },
});

export const {
  loadingDocStart,
  docLoadSuccess,
  setCurrentDocument,
  setNbPage,
  docFail,
} = counterSlice.actions;

export default counterSlice.reducer;

export const setDocument = (doc:IDocument): AppThunk => async dispatch => {
  dispatch(setCurrentDocument(doc));
  console.log('tzuc');
};

export const readDocument = (doc:IDocument): AppThunk => async dispatch => {
  try {
    console.log('xxxxxxxx');
    dispatch(loadingDocStart());
    //console.log('pouet');
    //const {data} = await api.get<any>('/documents/'+doc.accessToken+'/adapt/pdf/');

    //console.log('flon');
    //dispatch(docLoadSuccess(data));
  } catch (err) {
    dispatch(docFail(err.toString()));
    console.log('blop');
  }
};

export const computePages = (nbPages:number): AppThunk => async dispatch => {
  console.log(nbPages);
  //dispatch(setNbPage(Math.ceil(docHeight/screenHeight)));
  dispatch(setNbPage(nbPages));
};