import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument} from '../../model';

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
    localDocsLoading: (state: DocumentListState) => {
      state.loading = true;
    },
    localDocsLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<IDocument[]>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    addLocalDocument: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      state.data = state.data.concat(action.payload);
      console.log(JSON.stringify(state.data));
    },
    localDocsFail: (state: DocumentListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  localDocsLoading,
  localDocsLoadSuccess,
  addLocalDocument,
  localDocsFail,
} = availableDocsSlice.actions;

export default availableDocsSlice.reducer;
