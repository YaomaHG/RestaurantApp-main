export default (sequelize, DataTypes) =>
  sequelize.define(
    "Producto",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      precio: { type: DataTypes.FLOAT, allowNull: false },
      descripcion: { type: DataTypes.STRING },
      categoriaId: { type: DataTypes.INTEGER },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
      stockControlado: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "productos",
      timestamps: false,
    }
  );
