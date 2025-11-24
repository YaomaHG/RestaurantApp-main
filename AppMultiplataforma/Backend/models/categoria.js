export default (sequelize, DataTypes) =>
  sequelize.define(
    "Categoria",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "categorias",
      timestamps: false,
    }
  );
