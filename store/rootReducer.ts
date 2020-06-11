import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './features/auth/slice';
import profileReducer from './features/profile/slice';
import documentsReadyReducer from './features/localDocs/slice';
import documentsReducer from './features/remoteDocs/slice';
import docReducer from './features/document/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  available: documentsReadyReducer,
  documents: documentsReducer,
  doc: docReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
