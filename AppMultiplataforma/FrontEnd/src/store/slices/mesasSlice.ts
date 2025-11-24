import { createSlice } from '@reduxjs/toolkit';
import { restaurantApi } from '../../api/restaurantApi';

interface Mesa { id:number; numero:number; estado:string; capacidad?:number; meseroAsignadoId?:number }
interface MesasState { items:Mesa[]; lastUpdated?:number }
const initialState: MesasState = { items: [] };

const mesasSlice = createSlice({
  name: 'mesas',
  initialState,
  reducers: {
    socketUpdateMesas(state, action){
      // merge by id
      const incoming: Mesa[] = action.payload;
      const map = new Map(state.items.map(m => [m.id, m]));
      incoming.forEach(m => map.set(m.id, { ...map.get(m.id), ...m }));
      state.items = Array.from(map.values());
      state.lastUpdated = Date.now();
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(restaurantApi.endpoints.mesas.matchFulfilled, (state, {payload}) => {
      state.items = payload; state.lastUpdated = Date.now();
    });
  }
});

export const { socketUpdateMesas } = mesasSlice.actions;
export default mesasSlice.reducer;
