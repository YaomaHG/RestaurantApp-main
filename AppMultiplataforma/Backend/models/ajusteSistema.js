export default (sequelize, DataTypes) =>
  sequelize.define(
    "AjusteSistema",
    {
      clave: { type: DataTypes.STRING, primaryKey: true },
      valor: { type: DataTypes.TEXT },
    },
    {
      tableName: "ajustes_sistema",
      timestamps: false,
    }
  );