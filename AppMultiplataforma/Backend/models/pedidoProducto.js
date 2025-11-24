export default (sequelize, DataTypes) =>
  sequelize.define(
    "PedidoProducto",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // Las claves foráneas `PedidoId` y `ProductoId` se crean mediante las asociaciones
      cantidad: { type: DataTypes.INTEGER, defaultValue: 1 },
      precioUnitario: { type: DataTypes.FLOAT, allowNull: false },
      notas: { type: DataTypes.STRING },
      cocinaEstado: {
        type: DataTypes.ENUM("pendiente", "enPreparacion", "listo", "rechazado"),
        defaultValue: "pendiente",
      },
    },
    {
      tableName: "pedido_productos",
      timestamps: false,
    }
  );