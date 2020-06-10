import {combineReducers} from '@reduxjs/toolkit';

import documentsReadyReducer from './features/documentReady/slice';
import documentsReducer from './features/documentList/slice';
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
