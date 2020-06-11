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

const serverListSlice = createSlice({
  name: 'serverListSlice',
  initialState,
  reducers: {
    remoteDocsLoading: (state: DocumentListState) => {
      state.loading = true;
    },
    remoteDocsFail: (state: DocumentListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    remoteDocsLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.data = action.payload.items;
    }

  },
});

export const {
  remoteDocsLoading,
  remoteDocsFail,
  remoteDocsLoadSuccess,
} = serverListSlice.actions;

export default serverListSlice.reducer;

