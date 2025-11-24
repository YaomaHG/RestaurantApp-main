export default (sequelize, DataTypes) =>
  sequelize.define(
    "BrandingTicket",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombreRestaurante: { type: DataTypes.STRING },
      logoUrl: { type: DataTypes.STRING },
      leyendaInferior: { type: DataTypes.STRING },
      rfc: { type: DataTypes.STRING },
      direccion: { type: DataTypes.STRING },
    },
    {
      tableName: "branding_ticket",
      timestamps: false,
    }
  );