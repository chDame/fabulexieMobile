import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../index';

import api from '../../../services/api';
import {AppThunk} from '../../index';
import * as Navigation from '../../../services/Navigation';
import {Alert} from 'react-native';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
}

interface AuthState {
  data: IUser;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  data: {},
  loading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    authStart: (state: AuthState) => {
      state.loading = true;
    },
    fail: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInSuccess: (state: AuthState, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.data = action.payload;
    },
    signOutSuccess: (state: AuthState) => {
      state = initialState;
    },
  },
});

export const {
  authStart,
  signInSuccess,
  signOutSuccess,
  fail,
} = counterSlice.actions;

export default counterSlice.reducer;

const signOutInterceptor = (dispach: AppDispatch) => {
  api.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
      return dispach(signOut());
    }
    return Promise.reject(error);
  });
};

export const signIn = (
  email: string,
  password: string,
): AppThunk => async dispatch => {
  try {
    dispatch(authStart());
	
	const {data} = await api.post<IUser>('/authentication/login', 'email='+email+'&password='+ password);
	
    //const {data} = await api.post<ISession>('/authentication/login', {email, password});
	console.log(data);
    api.defaults.headers.Authorization = data.token;

    signOutInterceptor(dispatch);

    dispatch(signInSuccess(data));
  } catch (err) {
    Alert.alert('Invalid credentials');
    dispatch(fail(err.toString()));
  }
};

export const signUp = (user: IUser): AppThunk => async dispatch => {
  try {
    dispatch(authStart());

    await api.post<IUser>('/users', user);

    Navigation.navigate('SignIn');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const signOut = (): AppThunk => async dispatch => {
  try {
    api.defaults.headers.Authorization = '';

    dispatch(signOutSuccess());
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};
