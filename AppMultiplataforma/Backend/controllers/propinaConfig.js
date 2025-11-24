import { PropinaConfig } from "../models/index.js";

export const getPropinaConfig = async (req, res) => {
  const config = await PropinaConfig.findAll();
  res.json(config);
};

export const setPropinaConfig = async (req, res) => {
  const { tipo, valor, activo } = req.body;
  const config = await PropinaConfig.create({ tipo, valor, activo });
  res.status(201).json(config);
};

export const updatePropinaConfig = async (req, res) => {
  const config = await PropinaConfig.findByPk(req.params.id);
  if (!config) return res.status(404).json({ msg: "Configuración no encontrada" });
  Object.assign(config, req.body);
  await config.save();
  res.json(config);
};

export const deletePropinaConfig = async (req, res) => {
  const config = await PropinaConfig.findByPk(req.params.id);
  if (!config) return res.status(404).json({ msg: "Configuración no encontrada" });
  await config.destroy();
  res.json({ msg: "Configuración eliminada" });
};