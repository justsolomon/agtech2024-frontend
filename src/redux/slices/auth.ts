import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'types';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { userType: '' },
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
  },
});

export const { setUserType } = authSlice.actions;

export default authSlice.reducer;
