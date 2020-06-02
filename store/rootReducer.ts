import {combineReducers} from '@reduxjs/toolkit';

import documentsReducer from './features/documentList/slice';
import authReducer from './features/auth/slice';

const rootReducer = combineReducers({
  tasks: documentsReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
