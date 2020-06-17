import { useSelector } from 'react-redux';
import { AppThunk } from '../store';
import { RootState } from '../store/rootReducer';
import { authStart, signInSuccess, signOutSuccess, fail } from '../store/features/auth/slice';
import { setCurrentProfile, deleteProfile } from '../store/features/profile/slice';
import { IUser, IConfig, ILetterRule } from '../store/model';
import api from './api';
import { AsyncStorage } from 'react-native';
import * as Navigation from './Navigation';
import translate from './i18n';

export class ProfileService {
  
  loadProfile = (profile: IConfig): AppThunk => async dispatch => {
    if (profile.letterRules) {
      for (let i=0; i < profile.letterRules.length; i++) {
        let rule = profile.letterRules[i];
        rule.lettersString = '';
        if (rule.letters) {
          for (let letIdx=0;letIdx < rule.letters.length; letIdx++) {
            rule.lettersString+=rule.letters[letIdx];
          }
        }
      }
    }
    dispatch(setCurrentProfile(profile));
  }

  saveProfile = (user: IUser, profile: IConfig): AppThunk => async dispatch => {
    if (profile.letterRules) {
      for (let i=0; i < profile.letterRules.length; i++) {
        let rule = profile.letterRules[i];
        rule.letters = [];
        if (rule.lettersString) {
          for (let letIdx=0;letIdx < rule.lettersString.length; letIdx++) {
            rule.letters[letIdx]=rule.lettersString.charAt(letIdx);
          }
        }
      }
    }
    await api.put(`/users/${user.id}/configs/${profile.id}`, profile);
    this.loadProfile(profile);
  }

  cleanProfile = (): AppThunk => async dispatch => {
    dispatch(deleteProfile());
  }
}

const profileService = new ProfileService();

export default profileService;