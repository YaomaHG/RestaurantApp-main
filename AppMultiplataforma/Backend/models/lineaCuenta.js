export default (sequelize, DataTypes) =>
  sequelize.define(
    "LineaCuenta",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // Las claves foráneas `CuentaId` y `PedidoProductoId` se crean mediante asociaciones
      comensal: { type: DataTypes.STRING },
      monto: { type: DataTypes.FLOAT, defaultValue: 0 },
    },
    {
      tableName: "lineas_cuenta",
      timestamps: false,
    }
  );