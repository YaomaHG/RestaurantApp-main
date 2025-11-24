export default (sequelize, DataTypes) =>
  sequelize.define(
    "Inventario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // La FK `ProductoId` será creada por la asociación Producto.hasOne(Inventario)
      stockActual: { type: DataTypes.FLOAT, defaultValue: 0 },
      stockMinimo: { type: DataTypes.FLOAT, defaultValue: 0 },
      unidad: { type: DataTypes.STRING },
      ultimaActualizacion: { type: DataTypes.DATE },
    },
    {
      tableName: "inventarios",
      timestamps: false,
    }
  );