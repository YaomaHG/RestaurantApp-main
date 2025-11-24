import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { socketUpdateMesas } from '../store/slices/mesasSlice';
import { socketSetPedidosMesa, socketUpdateEstadoPedido } from '../store/slices/pedidosSlice';

export const useSocket = () => {
  const token = useSelector((s:RootState)=> s.auth.accessToken);
  const dispatch = useDispatch();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if(!token){
      socketRef.current?.disconnect();
      socketRef.current = undefined;
      return;
    }
    // conectar
    const s = io('http://localhost:3000', { auth: { token: `Bearer ${token}` } });
    socketRef.current = s;
    s.on('connect', () => console.log('Socket conectado')); 
    s.on('mesas:update', (mesas) => dispatch(socketUpdateMesas(mesas)));
    s.on('pedidos:update', (data) => dispatch(socketSetPedidosMesa(data)));
    s.on('pedidos:estado', (data) => dispatch(socketUpdateEstadoPedido(data)));
    // otros eventos pueden despachar acciones aquí
    return () => { s.disconnect(); };
  }, [token, dispatch]);
};

export default useSocket;