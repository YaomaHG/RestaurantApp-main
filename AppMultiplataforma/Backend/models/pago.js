export default (sequelize, DataTypes) =>
  sequelize.define(
    "Pago",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      metodo: {
        type: DataTypes.ENUM("efectivo", "tarjeta", "transferencia"),
        allowNull: false,
      },
      monto: { type: DataTypes.FLOAT, allowNull: false },
      referencia: { type: DataTypes.STRING },
      fechaPago: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "pagos",
      timestamps: false,
    }
  );
