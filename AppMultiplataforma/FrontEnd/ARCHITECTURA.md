# Arquitectura Frontend Móvil (Propuesta)

## Stack Principal
- Plataforma: React Native + Expo (gestión rápida, OTA updates, biometría sencilla)
- Estado global: Redux Toolkit + RTK Query (cache normalizado + fetching)
- Navegación: React Navigation (Drawer + Stack + Bottom Tabs)
- WebSockets: socket.io-client para eventos en tiempo real (mesas, pedidos, cocina, inventario)
- Persistencia offline: AsyncStorage + redux-persist + cola de acciones (outbox) para reintentos
- Autenticación segura: SecureStore (expo-secure-store) para refresh token; access token en memoria
- Biometría: expo-local-authentication (desbloquear sesión guardada)
- Testing: Jest + React Native Testing Library para componentes críticos

## Estructura de Carpetas
```
FrontEnd/
  src/
    api/                # Definiciones RTK Query (endpoints REST + WS hooks)
    components/         # Componentes reutilizables UI (Botones, Cards, Modales)
    hooks/              # Hooks personalizados (useAuth, useSocket, useOfflineQueue)
    navigation/         # Configuración navegadores (Drawer, Stacks, Tabs)
    screens/            # Pantallas (Mesas, PedidoDetalle, Cuenta, Reportes, Login, etc.)
    store/              # slices Redux + configuración rootStore
    theme/              # Paleta, tipografía, tamaños
    utils/              # Helpers (formatos de moneda, fecha, validaciones)
    workers/            # (Opcional) Background tasks (sync, notificaciones)
  assets/               # Íconos, imágenes, fuentes
  metro.config.js
  App.tsx
```

## Flujos de Navegación
- Drawer Root
  - Dashboard (KPIs rápidas)
  - Mesas (Grid -> Tap abre DetalleMesa)
  - Pedidos (Lista filtrable por estado - solo admin/cajero)
  - Reportes (Tabs: Ventas, Productos, Meseros)
  - Inventario (admin/cajero)
  - Configuración (admin)
  - Perfil / Logout
- Stacks secundarios: `MesaStack` (MesaDetalle -> AgregarPedido -> EditarLinea), `CuentaStack` (CuentaDetalle -> Split -> Pagos -> Ticket)
- Tabs dentro de Reportes: Ventas | Top Productos | Meseros | Alertas Inventario

## Pantallas Clave
- Login: email, contraseña, botón "Usar biometría" (si existe refresh válido)
- Dashboard: tarjetas con mesas ocupadas, pedidos pendientes, ventas del día
- Mesas: grid responsivo, colores por estado, indicador mesero asignado
- Detalle Mesa: pedidos activos, agregar producto, notas, estado cocina
- Crear/Editar Pedido: formulario rápido con categorías + búsqueda
- Cuenta: desglose línea por comensal, aplicar descuento, propina sugerida, pagos múltiples
- Cierre de Caja: resumen día, generar reporte, enviar email
- Reportes: rangos fecha, exportar PDF/Excel
- Inventario: lista stock, alertas resaltadas, registrar movimiento
- Configuración: branding, propina, promociones, usuarios

## Estado y Slices (Redux Toolkit)
- authSlice: user, accessToken, status, errores
- mesasSlice: listado, última actualización, filtros
- pedidosSlice: pedidos por mesa, índice por id, estados meta
- cuentaSlice: cuenta activa, líneas, cálculos (subtotal, descuentos, propina)
- inventarioSlice: items, alertas
- reportesSlice: caché últimos resultados (ventas, top productos, meseros)
- uiSlice: modales, toasts, tema
- offlineSlice: cola de acciones pendientes (background sync)

## RTK Query Endpoints (api/restaurantApi.ts)
- auth: login, refresh, logout, register
- mesas: list, get, crear, combinar, dividir, asignar
- pedidos: por mesa, crear, actualizar, cambiarEstado
- pedidoProductos: listar, agregar, actualizar, eliminar
- cuentas: abrir, agregarLineas, dividir, aplicarDescuento, calcularPropina, cerrar, ticket
- pagos: listar/agregar
- cierreCaja: generar, listar, enviarEmail
- reportes: ventasDiarias/Semanales/Mensuales, topProductos, rendimientoMeseros, propinas, alertasInventario
- inventario: list, alertas, producto, actualizarStockMinimo, movimiento
- promociones, ajustes, propinaConfig, branding

## WebSocket (useSocket Hook)
- Conexión tras login (Bearer accessToken)
- Eventos escuchados -> despachan acciones sobre slices
  - mesas:update -> actualizar estado mesa en store
  - pedidos:new/update/estado -> merge en pedidosSlice
  - cocina:pedidoListo -> notificación local + actualización pedidosSlice
  - cuentas:update -> recalcular totales
  - inventario:alerta -> marcar item en inventarioSlice

## Offline / Sync Estrategia
1. Al perder conexión: acciones mutadoras (crear pedido, agregar línea) se encolan en `offlineSlice.outbox`.
2. Cada acción incluye payload + endpoint + método.
3. Al reconectar, `useOfflineQueue` procesa secuencialmente; si falla (código >=500) reintenta exponencial; si 4xx remueve y registra error.
4. Datos críticos (mesas, pedidos de mesa activa, cuenta activa) se guardan usando `redux-persist`.
5. Tokens: refresh almacenado en SecureStore; si offline y expira access, se usa refresh local al reconectar.

## Gestión de Roles en UI
- Hook `useRole()` expone booleans (isAdmin, isCajero, isMesero).
- Componentes sensibles (Botón Cerrar Cuenta) render condicionada.
- Navigators filtran entradas del Drawer por rol.

## Biometría
- Tras login y guardar refresh en SecureStore, en apertura de app si hay refresh válido se pide biometría antes de solicitar nuevo access.
- Fallback a formulario si biometría falla.

## Theming
- `theme/` con archivo base (colors, spacing, typography).
- Modo oscuro/claro sincronizado con el dispositivo (`Appearance`) y persistido.

## Manejo de Errores / Toasts
- Interceptores RTK Query transforman errores en objeto estandar `{code, message}`.
- `uiSlice` gestiona cola de toasts.

## Seguridad Adicional
- Sanitizar inputs (regex básicos) antes de enviar.
- Prevenir doble envío (deshabilitar botones en loading).
- Revisar expiración access en hook `useAuth` (timer antes de 1 minuto vencimiento -> refresca).

## Ejemplo Rápido de Endpoint RTK Query
```ts
// api/restaurantApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Mesas','Pedidos','Cuenta','Inventario','Reportes'],
  endpoints: (builder) => ({
    login: builder.mutation<{accessToken:string;refreshToken:string;user:any}, {email:string;password:string}>({
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    mesas: builder.query<any[], void>({
      query: () => 'mesas', providesTags: ['Mesas']
    }),
  })
});
export const { useLoginMutation, useMesasQuery } = restaurantApi;
```

## Paquetes Clave
- react-native, expo
- @reduxjs/toolkit, react-redux
- @react-navigation/native, drawer, stack, tabs
- socket.io-client
- redux-persist
- expo-secure-store, expo-local-authentication
- date-fns (manejo fechas), numeral (formato números)

## Posibles Optimizaciones Futuras
- Code push OTA (Expo Updates)
- Pre-fetch inteligente (mesas + pedidos activos post login)
- Memoización selectores Reselect
- Suspense para carga inicial

## Métricas y Monitoreo (Opcional)
- Integrar Sentry para errores.
- Registro performance (JS FPS) en pantallas de alta interacción (Mesas / Pedido).

## Próximos Pasos
1. Inicializar proyecto Expo y dependencias base.
2. Crear slices + restaurantApi stub.
3. Implementar Login + flujo tokens.
4. Socket + actualizaciones Mesas.
5. Pantallas Mesa y PedidoDetalle.
6. Cuenta y Pagos.
7. Reportes + Exportaciones.
8. Inventario y Configuración.
9. Offline queue y biometría.
10. Refinamiento de UX y accesibilidad.
