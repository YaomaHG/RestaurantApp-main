export default (sequelize, DataTypes) =>
  sequelize.define(
    "Pedido",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      estado: {
        type: DataTypes.ENUM("preparacion", "listo", "servido"),
        defaultValue: "preparacion",
      },
      instrucciones: { type: DataTypes.STRING },
      creadoPorId: { type: DataTypes.INTEGER },
      enviadoCocinaAt: { type: DataTypes.DATE },
      servidoAt: { type: DataTypes.DATE },
    },
    {
      tableName: "pedidos",
      timestamps: false,
    }
  );
