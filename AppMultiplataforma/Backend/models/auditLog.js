export default (sequelize, DataTypes) =>
  sequelize.define(
    "AuditLog",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER },
      accion: { type: DataTypes.STRING },
      recurso: { type: DataTypes.STRING },
      fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "audit_logs",
      timestamps: false,
    }
  );