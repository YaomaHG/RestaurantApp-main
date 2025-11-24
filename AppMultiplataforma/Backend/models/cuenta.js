export default (sequelize, DataTypes) =>
  sequelize.define(
    "Cuenta",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      subtotal: { type: DataTypes.FLOAT, defaultValue: 0 },
      descuentos: { type: DataTypes.FLOAT, defaultValue: 0 },
      total: { type: DataTypes.FLOAT, defaultValue: 0 },
      propina: { type: DataTypes.FLOAT, defaultValue: 0 },
      porcentajePropina: { type: DataTypes.FLOAT, defaultValue: 0 },
      estado: { type: DataTypes.ENUM("abierta", "cerrada"), defaultValue: "abierta" },
      cerradaPorId: { type: DataTypes.INTEGER },
      fechaCierre: { type: DataTypes.DATE },
    },
    {
      tableName: "cuentas",
      timestamps: false,
    }
  );
