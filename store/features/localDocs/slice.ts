import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument} from '../../model';

export interface DocumentListState {
  data: IDocument[];
  ids: number[];
  loading: boolean;
  error: string | null;
}

export const initialState: DocumentListState = {
  data: [],
  ids: [],
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
      for(let i=0;i<state.data.length;i++) {
        state.ids = state.ids.concat(state.data[i].id);
      }
    },
    updateDocument: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      let index = state.ids.indexOf(action.payload.id);
      if (index>=0) {
        Object.assign(state.data[index], action.payload);
      }
    },
    addLocalDocument: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      let index = state.ids.indexOf(action.payload.id);

      if (index<0) {
        state.data = state.data.concat(action.payload);
        state.ids = state.ids.concat(action.payload.id);
      } else {
        Object.assign(state.data[index], action.payload);
      }
    },
    removeLocalDocument: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      let index = state.ids.indexOf(action.payload.id);
      if (index>=0) {
        state.data = [...state.data.slice(0, index), ...state.data.slice(index + 1)];
        state.ids = [...state.ids.slice(0, index), ...state.ids.slice(index + 1)];
      }
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
  removeLocalDocument,
  updateDocument,
  localDocsFail,
} = availableDocsSlice.actions;

export default availableDocsSlice.reducer;
