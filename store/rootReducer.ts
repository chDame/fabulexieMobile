import {combineReducers} from '@reduxjs/toolkit';

import documentsReadyReducer from './features/localDocs/slice';
import documentsReducer from './features/remoteDocs/slice';
import docReducer from './features/document/slice';
import authReducer from './features/auth/slice';

const rootReducer = combineReducers({
  available: documentsReadyReducer,
  documents: documentsReducer,
  auth: authReducer,
  doc: docReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
