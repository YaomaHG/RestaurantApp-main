# API Restaurante — Endpoints

**Encabezado global para endpoints que requieren autenticación:**
```
Authorization: Bearer <token>
```
Usar ✅ si se necesita, ❌ si no.

## AUTH

### Registro de usuario (POST)
`http://localhost:3000/api/auth/register`
**Encabezado:** ❌
**Body:** ✅
```json
{
  "nombre": "Juan",
  "email": "juan@mail.com",
  "password": "123456",
  "rol": "mesero"
}
```

### Login de usuario (POST)
`http://localhost:3000/api/auth/login`
**Encabezado:** ❌
**Body:** ✅
```json
{
  "email": "juan@mail.com",
  "password": "123456"
}
```

## MESAS

### Listar mesas (GET)
`http://localhost:3000/api/mesas`
**Encabezado:** ✅
**Body:** ❌

### Crear mesa (POST)
`http://localhost:3000/api/mesas`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "numero": 5,
  "estado": "disponible"
}
```

### Obtener mesa por ID (GET)
`http://localhost:3000/api/mesas/:id`
**Encabezado:** ✅
**Body:** ❌

### Actualizar mesa (PUT)
`http://localhost:3000/api/mesas/:id`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "estado": "ocupada"
}
```

### Combinar mesas (POST)
`http://localhost:3000/api/mesas/combinar`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "mesas": [1, 2]
}
```

### Dividir mesa (POST)
`http://localhost:3000/api/mesas/dividir/:id`
**Encabezado:** ✅
**Body:** ❌

## PEDIDOS

### Listar pedidos (GET)
`http://localhost:3000/api/pedidos`
**Encabezado:** ✅
**Body:** ❌

### Crear pedido (POST)
`http://localhost:3000/api/pedidos`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "mesaId": 3,
  "productos": [1, 2],
  "notas": "Sin picante"
}
```

### Pedidos por mesa (GET)
`http://localhost:3000/api/pedidos/mesa/:mesaId`
**Encabezado:** ✅
**Body:** ❌

### Actualizar pedido (PUT)
`http://localhost:3000/api/pedidos/:id`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "estado": "servido",
  "productos": [1, 3]
}
```

### Eliminar pedido (DELETE)
`http://localhost:3000/api/pedidos/:id`
**Encabezado:** ✅
**Body:** ❌

## CUENTAS

### Ver cuenta de mesa (GET)
`http://localhost:3000/api/cuentas/:mesaId`
**Encabezado:** ✅
**Body:** ❌

### Abrir cuenta (POST)
`http://localhost:3000/api/cuentas/abrir`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "mesaId": 4
}
```

### Agregar pedido a cuenta (POST)
`http://localhost:3000/api/cuentas/agregar-pedido`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "cuentaId": 2,
  "pedidoId": 5
}
```

### Cerrar cuenta (POST)
`http://localhost:3000/api/cuentas/cerrar`
**Encabezado:** ✅
**Body:** ✅
```json
{
  "cuentaId": 2,
  "metodoPago": "tarjeta",
  "propina": 50
}
```

## REPORTES

### Ventas del día (GET)
`http://localhost:3000/api/reportes/ventas/dia`
**Encabezado:** ✅
**Body:** ❌

### Ventas de la semana (GET)
`http://localhost:3000/api/reportes/ventas/semana`
**Encabezado:** ✅
**Body:** ❌

### Ventas del mes (GET)
`http://localhost:3000/api/reportes/ventas/mes`
**Encabezado:** ✅
**Body:** ❌

### Productos más vendidos (GET)
`http://localhost:3000/api/reportes/productos/top`
**Encabezado:** ✅
**Body:** ❌

### Desempeño de meseros (GET)
`http://localhost:3000/api/reportes/meseros/desempeño`
**Encabezado:** ✅
**Body:** ❌

### Inventario / alertas (GET)
`http://localhost:3000/api/reportes/inventario`
**Encabezado:** ✅
**Body:** ❌

