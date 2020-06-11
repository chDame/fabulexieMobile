import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument} from '../../model';
import {AppThunk} from '../../index';

export interface DocumentState {
  doc: IDocument | null;
  loading: boolean;
  data: any;
  nbPage: number;
  currentPage: number;
  error: string | null;
  filePath: string | null;
}

export const initialState: DocumentState = {
  doc: null,
  loading: false,
  data: null,
  nbPage: 1,
  currentPage: 1,
  error: null,
  filePath: null,
};

const docSlice = createSlice({
  name: 'docSlice',
  initialState,
  reducers: {
    setCurrentDocument: (
      state: DocumentState, 
      doc: PayloadAction<IDocument>
    ) => {
      state.nbPage = 1;
      state.currentPage=1;
      state.loading = true;
      state.doc = doc.payload;
      state.data = null;
    },

    docFail: (state: DocumentState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
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
  setCurrentDocument,
  setNbPage,
  docFail,
} = docSlice.actions;

export default docSlice.reducer;
/*
export const setDocument = (doc:IDocument): AppThunk => async dispatch => {
  dispatch(setCurrentDocument(doc));
};

export const setTotalPages = (nbPages:number): AppThunk => async dispatch => {
    dispatch(setNbPage(nbPages));
};*/