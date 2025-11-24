import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Determina la URL base para llamadas API en distintos entornos:
// - En Expo (dev) usa el host del debugger (ej: 192.168.1.42:19000) para apuntar al equipo de desarrollo.
// - En emulador Android usa 10.0.2.2 que mapea al localhost del host.
// - Por defecto usa localhost:3000
// For development on this machine, use the given PC IP so physical devices can reach the backend
let BASE_URL = 'http://192.168.1.97:3000/api';

try {
  const manifest: any = Constants.manifest || (Constants as any).expoConfig || {};
  // `debuggerHost` suele tener formato '192.168.1.42:19000' en Expo CLI
  const debuggerHost = manifest.debuggerHost || manifest.hostUri || '';
  if (debuggerHost) {
    const host = debuggerHost.split(':').shift();
    if (host) BASE_URL = `http://${host}:3000/api`;
  } else if (Platform.OS === 'android') {
    // Android emulator mapping to host machine
    BASE_URL = 'http://10.0.2.2:3000/api';
  }
} catch (e) {
  // en caso de algún error, mantenerse con la url por defecto
  console.warn('No se pudo resolver BASE_URL dinámicamente, usando localhost', e);
}

// Log para depuración: mostrar la URL que usará la app
console.log('[restaurantApi] BASE_URL =', BASE_URL);

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Mesas','Pedidos','Cuenta','Cuentas'],
  endpoints: (builder) => ({
    login: builder.mutation<{accessToken:string;refreshToken:string;user:any}, {email:string;password:string}>({
      query: (credentials) => ({ url: 'auth/login', method: 'POST', body: credentials })
    }),
    register: builder.mutation<{accessToken:string;refreshToken:string;user:any}, {nombre:string;email:string;password:string;rol?:string}>({
      query: (body) => ({ url: 'auth/register', method: 'POST', body }),
    }),
    mesas: builder.query<any[], void>({
      query: () => 'mesas',
      providesTags: ['Mesas']
    }),
    pedidosPorMesa: builder.query<any[], number>({
      query: (mesaId) => `pedidos/mesa/${mesaId}`,
      providesTags: (result, error, arg) => [{ type: 'Pedidos', id: `mesa-${arg}` }]
    }),
    cambiarEstadoPedido: builder.mutation<any, { id:number; estado:string }>({
      query: ({ id, estado }) => ({ url: `pedidos/estado/${id}`, method: 'PATCH', body: { estado } }),
      invalidatesTags: (r,e,{id}) => [{ type: 'Pedidos', id }]
    })
    ,cuentaActiva: builder.query<any, number>({
      query: (mesaId) => `cuentas/activa/${mesaId}`,
      providesTags: (r,e,mesaId) => [{ type: 'Cuenta', id: `mesa-${mesaId}` }]
    })
    ,abrirCuenta: builder.mutation<any, number>({
      query: (mesaId) => ({ url: `cuentas/abrir/${mesaId}`, method: 'POST' }),
      invalidatesTags: (r,e,mesaId) => [{ type: 'Cuenta', id: `mesa-${mesaId}` }]
    })
    ,agregarItemCuenta: builder.mutation<any, { mesaId:number; price:number }>({
      query: ({ mesaId, price }) => ({ url: `cuentas/item/${mesaId}`, method: 'POST', body: { price } }),
      invalidatesTags: (r,e,{mesaId}) => [{ type: 'Cuenta', id: `mesa-${mesaId}` }]
    })
    ,cerrarCuenta: builder.mutation<any, { mesaId:number; pagos?: any[]; descuento?: number; propina?: number }>({
      query: ({ mesaId, pagos = [], descuento=0, propina=0 }) => ({ url: `cuentas/cerrar/${mesaId}`, method: 'POST', body: { pagos, descuento, propina } }),
      invalidatesTags: (r,e,{mesaId}) => [{ type: 'Cuenta', id: `mesa-${mesaId}` }, { type: 'Mesas' }]
    })
    ,agregarPagoCuenta: builder.mutation<any, { mesaId:number; metodo:string; monto:number; referencia?:string }>({
      query: ({ mesaId, metodo, monto, referencia }) => ({ url: `cuentas/pago/${mesaId}`, method: 'POST', body: { metodo, monto, referencia } }),
      invalidatesTags: (r,e,{mesaId}) => [{ type: 'Cuenta', id: `mesa-${mesaId}` }]
    })
    ,actualizarAjustesCuenta: builder.mutation<any, { mesaId:number; descuento:number; propina:number }>({
      query: ({ mesaId, descuento, propina }) => ({ url: `cuentas/ajustes/${mesaId}`, method: 'PATCH', body: { descuento, propina } }),
      invalidatesTags: (r,e,{mesaId}) => [{ type: 'Cuenta', id: `mesa-${mesaId}` }]
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useMesasQuery, usePedidosPorMesaQuery, useCambiarEstadoPedidoMutation, useCuentaActivaQuery, useAbrirCuentaMutation, useAgregarItemCuentaMutation, useCerrarCuentaMutation, useAgregarPagoCuentaMutation, useActualizarAjustesCuentaMutation } = restaurantApi;
