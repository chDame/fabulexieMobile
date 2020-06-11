import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../model';

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
      console.log(state.data);
    },
    signOutSuccess: (state: AuthState) => {
      state.data = {};
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