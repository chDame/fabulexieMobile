import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDocument, ISpaceAccess, ISpace, IDirectory} from '../../model';

export interface DocumentListState {
  spaces: ISpaceAccess[];
  currentSpace: ISpace|null;
  directories: IDirectory[];
  currentDir: IDirectory|null;
  docs: IDocument[];
  loading: boolean;
  error: string | null;
}

export const initialState: DocumentListState = {
  spaces:[],
  currentSpace: null,
  directories:[],
  currentDir: null,
  docs: [],
  loading: false,
  error: null,
};

const serverListSlice = createSlice({
  name: 'serverListSlice',
  initialState,
  reducers: {
    remoteLoading: (state: DocumentListState) => {
      state.loading = true;
    },
    remoteLoadingFail: (state: DocumentListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    remoteDocsLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<IDocument[]>,
    ) => {
      state.loading = false;
      state.docs = action.payload;
    },
    remoteDirLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<IDirectory[]>,
    ) => {
      state.loading = false;
      state.directories = action.payload;
    },
    remoteSpacesLoadSuccess: (
      state: DocumentListState,
      action: PayloadAction<ISpaceAccess[]>,
    ) => {
      state.loading = false;
      state.spaces = action.payload;
    },
    setSpace: (
      state: DocumentListState,
      action: PayloadAction<ISpace>,
    ) => {
      state.loading = false;
      state.currentSpace = action.payload;
    },
    setDirectory: (
      state: DocumentListState,
      action: PayloadAction<IDirectory|null>,
    ) => {
      state.loading = false;
      state.currentDir = action.payload;
    }
  },
});

export const {
  remoteLoading,
  remoteLoadingFail,
  remoteSpacesLoadSuccess,
  remoteDirLoadSuccess,
  remoteDocsLoadSuccess,
  setSpace,
  setDirectory
} = serverListSlice.actions;

export default serverListSlice.reducer;

