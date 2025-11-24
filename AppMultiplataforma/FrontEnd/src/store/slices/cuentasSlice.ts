import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CuentaState {
  cuentasPorMesa: Record<number, any>;
}

const initialState: CuentaState = {
  cuentasPorMesa: {}
};

const cuentasSlice = createSlice({
  name: 'cuentas',
  initialState,
  reducers: {
    setCuentaActiva(state, action: PayloadAction<{ mesaId:number; cuenta:any }>) {
      state.cuentasPorMesa[action.payload.mesaId] = action.payload.cuenta;
    },
    clearCuenta(state, action: PayloadAction<number>) {
      delete state.cuentasPorMesa[action.payload];
    }
  }
});

export const { setCuentaActiva, clearCuenta } = cuentasSlice.actions;
export default cuentasSlice.reducer;