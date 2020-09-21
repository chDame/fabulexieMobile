import { AppThunk } from '../store';
import { setCurrentProfile, deleteProfile, startLoading } from '../store/features/profile/slice';
import { IUser, IConfig, IConfigResource } from '../store/model';
import api from './api';

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
    if (!profile.evenSyllabeRule) {
      profile.evenSyllabeRule = {}
    }
    if (!profile.oddSyllabeRule) {
      profile.oddSyllabeRule = {}
    }
    dispatch(setCurrentProfile(profile));
  }

  saveProfile = (user: IUser, profile: IConfig): AppThunk => async dispatch => {
    dispatch(startLoading());
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
    const {data} = await api.put<IConfigResource>(`/users/${user.id}/configs/${profile.id}`, profile);
    dispatch(this.loadProfile(data.userConfig));
  }

  cleanProfile = (): AppThunk => async dispatch => {
    dispatch(deleteProfile());
  }
}

const profileService = new ProfileService();

export default profileService;