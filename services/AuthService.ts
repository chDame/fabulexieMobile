import { useSelector } from 'react-redux';
import store, { AppThunk } from '../store';
import { RootState } from '../store/rootReducer';
import { authStart, signInSuccess, signOutSuccess, fail } from '../store/features/auth/slice';
import { setCurrentProfile } from '../store/features/profile/slice';
import profileService from './ProfileService';
import { IUser } from '../store/model';
import api from './api';
import { AsyncStorage } from 'react-native';
import * as Navigation from './Navigation';
import translate from './i18n';

export class AuthService {
  isAuthenticated = () => useSelector(
    (state: RootState) => state.auth.data.token,
  );

  getUserId = ():number => {
    return store.getState().auth.data.id;
  }
  offline = (): AppThunk => async dispatch => {
    dispatch(authStart());
    const data = { id:-1, name: 'offline', email: 'offline', token: 'offline' };
       
    dispatch(signInSuccess(data));
  }

  signInToken = (): AppThunk => async dispatch => {
    const token = await AsyncStorage.getItem('@UserToken');
    if (token) {
      try {
        dispatch(authStart());
        api.defaults.headers.Authorization = token;    
        const {data} = await api.post<IUser>('/authentication/loginWithToken');
    
        if (data.token) {
          api.defaults.headers.Authorization = data.token;
          await AsyncStorage.setItem('@UserToken', data.token);
        }
        if (data.activeConfig) {
          dispatch(profileService.loadProfile(data.activeConfig));
        }
        dispatch(signInSuccess(data));
      } catch (error) {
        console.warn('Error', error.message);
        dispatch(fail(error.toString()));
      }
    }
  }

  signIn = (email: string, password: string): AppThunk => async dispatch => {
    try {
      dispatch(authStart());
          
      const {data} = await api.post<IUser>('/authentication/login', 'email='+email+'&password='+ password);
 
      if (data.token) {
        api.defaults.headers.Authorization = data.token;
        await AsyncStorage.setItem('@UserToken', data.token);
      }
      if (data.activeConfig) {
        dispatch(profileService.loadProfile(data.activeConfig));
      }
      dispatch(signInSuccess(data));
    } catch (error) {
      if (error.response) {
        // The request was made. server responded out of range of 2xx
        dispatch(fail(error.response.data.message));
      } else if (error.request) {
        // The request was made but no response was received
        dispatch(fail(translate('ERROR_NETWORK')));
      } else {
        // Something happened in setting up the request that triggered an Error
        console.warn('Error', error.message);
        dispatch(fail(error.toString()));
      }
    }
  };
      
  signUp = (user: IUser): AppThunk => async dispatch => {
    try {
      dispatch(authStart());
      
      await api.post<IUser>('/users', user);    
      Navigation.navigate('SignIn');
    } catch (err) {
      dispatch(fail(err.toString()));
    }
  };
      
  signOut = (): AppThunk => async dispatch => {
    try {
      api.defaults.headers.Authorization = '';
      await AsyncStorage.removeItem('@UserToken');
      dispatch(profileService.cleanProfile());
      dispatch(signOutSuccess());
    } catch (err) {
      dispatch(fail(err.toString()));
    }
  };

}

const authService = new AuthService();

export default authService;