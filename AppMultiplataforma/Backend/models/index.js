import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

import userModel from "./user.js";
import mesaModel from "./mesa.js";
import categoriaModel from "./categoria.js";
import productoModel from "./producto.js";
import pedidoModel from "./pedido.js";
import cuentaModel from "./cuenta.js";
import pagoModel from "./pago.js";
import pedidoProductoModel from "./pedidoProducto.js";
import lineaCuentaModel from "./lineaCuenta.js";
import inventarioModel from "./inventario.js";
import movimientoInventarioModel from "./movimientoInventario.js";
import cierreCajaModel from "./cierreCaja.js";
import ajusteSistemaModel from "./ajusteSistema.js";
import promocionModel from "./promocion.js";
import propinaConfigModel from "./propinaConfig.js";
import brandingTicketModel from "./brandingTicket.js";
import auditLogModel from "./auditLog.js";
import refreshTokenModel from "./refreshToken.js";

// Modelos
export const User = userModel(sequelize, DataTypes);
export const Mesa = mesaModel(sequelize, DataTypes);
export const Categoria = categoriaModel(sequelize, DataTypes);
export const Producto = productoModel(sequelize, DataTypes);
export const Pedido = pedidoModel(sequelize, DataTypes);
export const Cuenta = cuentaModel(sequelize, DataTypes);
export const Pago = pagoModel(sequelize, DataTypes);
export const PedidoProducto = pedidoProductoModel(sequelize, DataTypes);
export const LineaCuenta = lineaCuentaModel(sequelize, DataTypes);
export const Inventario = inventarioModel(sequelize, DataTypes);
export const MovimientoInventario = movimientoInventarioModel(sequelize, DataTypes);
export const CierreCaja = cierreCajaModel(sequelize, DataTypes);
export const AjusteSistema = ajusteSistemaModel(sequelize, DataTypes);
export const Promocion = promocionModel(sequelize, DataTypes);
export const PropinaConfig = propinaConfigModel(sequelize, DataTypes);
export const BrandingTicket = brandingTicketModel(sequelize, DataTypes);
export const AuditLog = auditLogModel(sequelize, DataTypes);
export const RefreshToken = refreshTokenModel(sequelize, DataTypes);

// Relaciones

// Mesa → Pedidos
Mesa.hasMany(Pedido);
Pedido.belongsTo(Mesa);

// Mesa → Cuenta
Mesa.hasOne(Cuenta);
Cuenta.belongsTo(Mesa);

// Mesa → Mesero asignado
User.hasMany(Mesa, { foreignKey: "meseroAsignadoId" });
Mesa.belongsTo(User, { as: "meseroAsignado", foreignKey: "meseroAsignadoId" });

// Pedido ↔ PedidoProducto ↔ Producto
Pedido.hasMany(PedidoProducto);
PedidoProducto.belongsTo(Pedido);
Producto.hasMany(PedidoProducto);
PedidoProducto.belongsTo(Producto);

// Cuenta → Pagos
Cuenta.hasMany(Pago);
Pago.belongsTo(Cuenta);

// Cuenta → Lineas
Cuenta.hasMany(LineaCuenta);
LineaCuenta.belongsTo(Cuenta);
PedidoProducto.hasMany(LineaCuenta);
LineaCuenta.belongsTo(PedidoProducto);

// Producto → Inventario & Movimientos
Producto.hasOne(Inventario);
Inventario.belongsTo(Producto);
Producto.hasMany(MovimientoInventario);
MovimientoInventario.belongsTo(Producto);
User.hasMany(MovimientoInventario, { foreignKey: "usuarioId" });
MovimientoInventario.belongsTo(User, { foreignKey: "usuarioId" });

// User → CierreCaja / Audit / RefreshToken
User.hasMany(CierreCaja, { foreignKey: "usuarioId" });
CierreCaja.belongsTo(User, { foreignKey: "usuarioId" });
User.hasMany(AuditLog, { foreignKey: "userId" });
AuditLog.belongsTo(User, { foreignKey: "userId" });
User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// Categoria → Promocion (opcional)
Categoria.hasMany(Promocion, { foreignKey: "categoriaId" });
Promocion.belongsTo(Categoria, { foreignKey: "categoriaId" });

// Export
export { sequelize };

export default {
  sequelize,
  User,
  Mesa,
  Categoria,
  Producto,
  Pedido,
  Cuenta,
  Pago,
  PedidoProducto,
  LineaCuenta,
  Inventario,
  MovimientoInventario,
  CierreCaja,
  AjusteSistema,
  Promocion,
  PropinaConfig,
  BrandingTicket,
  AuditLog,
  RefreshToken,
};
