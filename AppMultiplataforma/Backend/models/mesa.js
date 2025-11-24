export default (sequelize, DataTypes) =>
  sequelize.define(
    "Mesa",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      numero: { type: DataTypes.INTEGER, allowNull: false },
      estado: {
        type: DataTypes.ENUM("disponible", "ocupada", "espera"),
        defaultValue: "disponible",
      },
      capacidad: { type: DataTypes.INTEGER, defaultValue: 4 },
      grupoCombinadaId: { type: DataTypes.INTEGER },
      meseroAsignadoId: { type: DataTypes.INTEGER },
      abiertaDesde: { type: DataTypes.DATE },
    },
    {
      tableName: "mesas",
      timestamps: false,
    }
  );
