export default (sequelize, DataTypes) =>
  sequelize.define(
    "CierreCaja",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      usuarioId: { type: DataTypes.INTEGER },
      fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      totalVentas: { type: DataTypes.FLOAT, defaultValue: 0 },
      totalPropinas: { type: DataTypes.FLOAT, defaultValue: 0 },
      efectivo: { type: DataTypes.FLOAT, defaultValue: 0 },
      tarjeta: { type: DataTypes.FLOAT, defaultValue: 0 },
      transferencia: { type: DataTypes.FLOAT, defaultValue: 0 },
      diferencias: { type: DataTypes.FLOAT, defaultValue: 0 },
      enviadoEmail: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "cierres_caja",
      timestamps: false,
    }
  );