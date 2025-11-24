export default (sequelize, DataTypes) =>
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      rol: {
        type: DataTypes.ENUM("mesero", "cajero", "admin"),
        allowNull: false,
        defaultValue: "mesero",
      },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
      ultimoLogin: { type: DataTypes.DATE },
      necesitaCambioPassword: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
