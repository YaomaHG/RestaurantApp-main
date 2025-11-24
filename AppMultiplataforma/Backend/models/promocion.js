export default (sequelize, DataTypes) =>
  sequelize.define(
    "Promocion",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      tipo: { type: DataTypes.ENUM("porcentaje", "monto"), allowNull: false },
      valor: { type: DataTypes.FLOAT, allowNull: false },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
      categoriaId: { type: DataTypes.INTEGER },
      fechaInicio: { type: DataTypes.DATE },
      fechaFin: { type: DataTypes.DATE },
    },
    {
      tableName: "promociones",
      timestamps: false,
    }
  );