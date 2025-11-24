export default (sequelize, DataTypes) =>
  sequelize.define(
    "MovimientoInventario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // Las FKs `ProductoId` y `usuarioId` serán creadas por las asociaciones
      tipo: { type: DataTypes.ENUM("entrada", "salida", "ajuste"), allowNull: false },
      cantidad: { type: DataTypes.FLOAT, allowNull: false },
      motivo: { type: DataTypes.STRING },
      fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "movimientos_inventario",
      timestamps: false,
    }
  );