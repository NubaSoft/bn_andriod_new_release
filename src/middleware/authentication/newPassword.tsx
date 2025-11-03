import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client } from '../../network/apiClient';
import { setAuthenticationLoader, setNewPasswordState, setSignUpState } from '../../redux/store/auth/authenticationSlice';

interface LoginArgs {
  navigation: any;
  data?: any;
};

export const newPassword = createAsyncThunk(
  'LOGIN',
  async (args: LoginArgs, thunkApi) => {
    thunkApi.dispatch(setAuthenticationLoader(true));
    thunkApi.dispatch(setNewPasswordState(''));
    try {
      const data: any = args?.data;
      const response: any = await client.post(endpoints.newPassword, data);  
      if (response.status == 204 || response.status == 201) {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setNewPasswordState('done'));
      } else {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setNewPasswordState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setAuthenticationLoader(false));
      thunkApi.dispatch(setNewPasswordState('error'));
    }
  },
);