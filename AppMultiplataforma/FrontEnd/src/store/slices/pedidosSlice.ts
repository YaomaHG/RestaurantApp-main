import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pedido { id:number; MesaId:number; estado:string; instrucciones?:string }
interface PedidosState { porMesa: Record<string, Pedido[]>; lastUpdated?:number }
const initialState: PedidosState = { porMesa: {} };

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    socketSetPedidosMesa(state, action: PayloadAction<{mesaId:number; pedidos:Pedido[]}>){
      state.porMesa[action.payload.mesaId] = action.payload.pedidos;
      state.lastUpdated = Date.now();
    },
    socketUpdateEstadoPedido(state, action: PayloadAction<{mesaId:number; id:number; estado:string}>){
      const list = state.porMesa[action.payload.mesaId];
      if(!list) return;
      const idx = list.findIndex(p=>p.id===action.payload.id);
      if(idx!==-1){ list[idx] = { ...list[idx], estado: action.payload.estado }; }
      state.lastUpdated = Date.now();
    }
  }
});

export const { socketSetPedidosMesa, socketUpdateEstadoPedido } = pedidosSlice.actions;
export default pedidosSlice.reducer;
