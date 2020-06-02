import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Navigation from '../../../services/Navigation';

import api from '../../../services/api';
import {AppThunk} from '../../index';

export interface IDocument {
  id: number;
  name: string;
  title: string;
  description: string;
  ownerId: number
  accessToken: string;
  completed: boolean;
}

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

const counterSlice = createSlice({
  name: 'counter',
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
    tasksLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<IDocument[]>,
    ) => {
      state.loading = false;
      state.data = action.payload.items;
    },
    addDocumentSuccess: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      state.editing = false;
      state.data.push(action.payload);
    },
    editDocumentSuccess: (state: DocumentListState, action: PayloadAction<IDocument>) => {
      const index = state.data.findIndex(
        task => task.id === action.payload.id,
      );
      state.data[index] = action.payload;
      state.editing = false;
    },
    deleteDocumentSuccess: (
      state: DocumentListState,
      action: PayloadAction<string>,
    ) => {
      state.data = state.data.filter(doc => doc.id !== action.payload);
      state.deleting = false;
    },
  },
});

export const {
  loadingStart,
  editingStart,
  deletingStart,
  tasksLoadSuccess,
  addDocumentSuccess,
  editDocumentSuccess,
  deleteDocumentSuccess,
  fail,
} = counterSlice.actions;

export default counterSlice.reducer;

export const fetchDocuments = (): AppThunk => async dispatch => {
  try {
    dispatch(loadingStart());

    const {data} = await api.get<IDocument[]>('/documents');

    dispatch(tasksLoadSuccess(data));
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const addDocument = (doc: IDocument): AppThunk => async dispatch => {
  try {
    dispatch(editingStart());

    const {data} = await api.post<IDocument>('/documents', doc);

    dispatch(addDocumentSuccess(data));

    Navigation.navigate('Documents');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const editDocument = (doc: IDocument): AppThunk => async dispatch => {
  try {
    dispatch(editingStart());

    const {data} = await api.put<IDocument>(`/documents/${doc.id}`, doc);

    dispatch(editDocumentSuccess(data));

    Navigation.navigate('Documents');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const deleteDocument = (docId: string): AppThunk => async dispatch => {
  try {
    dispatch(deletingStart());

    await api.delete(`/tasks/${docId}`);

    dispatch(deleteDocumentSuccess(docId));

    Navigation.navigate('Documents');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};
