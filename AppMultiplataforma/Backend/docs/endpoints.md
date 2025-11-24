# Endpoints API (Borrador)

## Autenticación
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout

## Mesas
- GET /api/mesas/
- GET /api/mesas/:id
- POST /api/mesas/
- PUT /api/mesas/:id
- POST /api/mesas/combinar
- POST /api/mesas/:id/dividir
- POST /api/mesas/:id/asignar-mesero
- POST /api/mesas/:id/liberar

## Pedidos
- GET /api/pedidos/mesa/:mesaId
- POST /api/pedidos/mesa/:mesaId
- GET /api/pedidos/:id
- PUT /api/pedidos/:id
- POST /api/pedidos/:id/enviar-cocina
- POST /api/pedidos/:id/marcar-servido

## Pedido Productos
- GET /api/pedido-productos/pedido/:pedidoId
- POST /api/pedido-productos/pedido/:pedidoId
- PUT /api/pedido-productos/:id
- DELETE /api/pedido-productos/:id

## Cuentas
- GET /api/cuentas/mesa/:mesaId
- POST /api/cuentas/mesa/:mesaId/abrir
- POST /api/cuentas/:id/agregar-lineas
- POST /api/cuentas/:id/dividir
- POST /api/cuentas/:id/aplicar-descuento
- POST /api/cuentas/:id/calcular-propina
- POST /api/cuentas/:id/cerrar
- GET /api/cuentas/:id/ticket

## Pagos
- GET /api/cuentas/:cuentaId/pagos
- POST /api/cuentas/:cuentaId/pagos

## Cierre Caja
- POST /api/cierre-caja/
- GET /api/cierre-caja/
- GET /api/cierre-caja/:id
- POST /api/cierre-caja/:id/enviar-email

## Reportes
- GET /api/reportes/ventas
- GET /api/reportes/productos/top
- GET /api/reportes/meseros/desempeno
- GET /api/reportes/inventario/alertas
- GET /api/reportes/propinas

## Inventario
- GET /api/inventario/
- GET /api/inventario/alertas
- GET /api/inventario/producto/:productoId
- PUT /api/inventario/producto/:productoId/stock-minimo
- POST /api/inventario/movimiento

## Promociones
- GET /api/promociones/
- GET /api/promociones/:id
- POST /api/promociones/
- PUT /api/promociones/:id
- DELETE /api/promociones/:id

## Ajustes
- GET /api/ajustes/
- GET /api/ajustes/:clave
- PUT /api/ajustes/:clave
- DELETE /api/ajustes/:clave

## Propina Config
- GET /api/propina-config/
- POST /api/propina-config/
- PUT /api/propina-config/:id
- DELETE /api/propina-config/:id

## Branding Ticket
- GET /api/branding/
- POST /api/branding/
- PUT /api/branding/:id
- DELETE /api/branding/:id

## Auditoría (Pendiente)
- GET /api/auditoria/

## Refresh Tokens (Pendiente)
- POST /api/auth/refresh
- DELETE /api/auth/refresh/:id

## Eventos WebSocket (conceptual)
- mesas:update
- pedidos:new, pedidos:update, pedidos:estado
- cocina:pedidoEnPreparacion, cocina:pedidoListo
- cuentas:update
- inventario:alerta
- notificaciones:pedidoListoMesero, mesaDesocupada
