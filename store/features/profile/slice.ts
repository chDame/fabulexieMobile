import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IConfig, ILetterRule } from '../../model';

export interface ProfileState {
  profile?: IConfig | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProfileState = {
  error: null,
  loading: false
};

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    startLoading:  (
      state: ProfileState, 
    ) => {
      state.loading = true;
    },
    setCurrentProfile: (
      state: ProfileState, 
      profile: PayloadAction<IConfig>
    ) => {
      state.profile = profile.payload;
      state.loading = false;
    },
    deleteProfile: (
      state: ProfileState,
    ) => {
      state.profile = null;
    },
    profileFail: (state: ProfileState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentProfile,
  deleteProfile,
  profileFail,
} = profileSlice.actions;

export default profileSlice.reducer;