import { configureStore } from '@reduxjs/toolkit';
import { restaurantApi } from '../api/restaurantApi';
import authReducer from './slices/authSlice';
import mesasReducer from './slices/mesasSlice';
import pedidosReducer from './slices/pedidosSlice';
import cuentasReducer from './slices/cuentasSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mesas: mesasReducer,
    pedidos: pedidosReducer,
    cuentas: cuentasReducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(restaurantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
