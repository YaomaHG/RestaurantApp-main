export default (sequelize, DataTypes) =>
  sequelize.define(
    "PropinaConfig",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tipo: { type: DataTypes.ENUM("fijo", "porcentaje", "manual"), defaultValue: "manual" },
      valor: { type: DataTypes.FLOAT, defaultValue: 0 },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "propina_config",
      timestamps: false,
    }
  );