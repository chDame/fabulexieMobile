import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument} from '../../model';

export interface DocumentState {
  doc: IDocument | null;
  loading: boolean;
  nbPage: number;
  currentPage: number;
  error: string | null;
  filePath: string | null;
}

export const initialState: DocumentState = {
  doc: null,
  loading: false,
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