export default (sequelize, DataTypes) =>
  sequelize.define(
    "RefreshToken",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER },
      token: { type: DataTypes.STRING, allowNull: false },
      expiracion: { type: DataTypes.DATE },
      revocado: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "refresh_tokens",
      timestamps: false,
    }
  );