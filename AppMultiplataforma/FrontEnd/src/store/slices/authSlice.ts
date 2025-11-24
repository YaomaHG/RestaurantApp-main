import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { restaurantApi } from '../../api/restaurantApi';

interface User { id:number; nombre:string; email:string; rol:string; }
interface AuthState {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  status: 'idle' | 'loading' | 'error';
  error?: string;
}

const initialState: AuthState = { status: 'idle' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutLocal(state){
      state.user = undefined; state.accessToken = undefined; state.refreshToken = undefined; state.status = 'idle';
    },
    setTokens(state, action: PayloadAction<{accessToken:string;refreshToken?:string}>){
      state.accessToken = action.payload.accessToken;
      if(action.payload.refreshToken) state.refreshToken = action.payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(restaurantApi.endpoints.login.matchPending, (state) => { state.status='loading'; state.error=undefined; });
    builder.addMatcher(restaurantApi.endpoints.login.matchFulfilled, (state, {payload}) => {
      state.status='idle';
      state.user = payload.user; state.accessToken = payload.accessToken; state.refreshToken = payload.refreshToken;
    });
    builder.addMatcher(restaurantApi.endpoints.login.matchRejected, (state, action) => {
      state.status='error'; state.error = action.error.message;
    });
    builder.addMatcher(restaurantApi.endpoints.register.matchPending, (state) => { state.status='loading'; state.error=undefined; });
    builder.addMatcher(restaurantApi.endpoints.register.matchFulfilled, (state, {payload}) => {
      state.status='idle';
      state.user = payload.user; state.accessToken = payload.accessToken; state.refreshToken = payload.refreshToken;
    });
    builder.addMatcher(restaurantApi.endpoints.register.matchRejected, (state, action) => {
      state.status='error'; state.error = action.error.message;
    });
  }
});

export const { logoutLocal, setTokens } = authSlice.actions;
export default authSlice.reducer;
