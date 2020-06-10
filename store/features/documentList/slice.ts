import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument} from '../../model';

import api from '../../../services/api';
import {AppThunk} from '../../index';

export interface DocumentListState {
  data: IDocument[];
  loading: boolean;
  editing: boolean;
  deleting: boolean;
  error: string | null;
}

export const initialState: DocumentListState = {
  data: [],
  loading: false,
  editing: false,
  deleting: false,
  error: null,
};

const serverListSlice = createSlice({
  name: 'serverListSlice',
  initialState,
  reducers: {
    loadingStart: (state: DocumentListState) => {
      state.loading = true;
    },
    editingStart: (state: DocumentListState) => {
      state.editing = true;
    },
    deletingStart: (state: DocumentListState) => {
      state.deleting = true;
    },
    fail: (state: DocumentListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.editing = false;
      state.deleting = false;
      state.error = action.payload;
    },
    docsLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.data = action.payload.items;
    }

  },
});

export const {
  loadingStart,
  editingStart,
  deletingStart,
  docsLoadSuccess,
  fail,
} = serverListSlice.actions;

export default serverListSlice.reducer;

export const fetchDocuments = (): AppThunk => async dispatch => {
  try {
    dispatch(loadingStart());

    const {data} = await api.get<any>('/documents');

    dispatch(docsLoadSuccess(data));
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};
