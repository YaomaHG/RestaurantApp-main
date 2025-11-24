import { BrandingTicket } from "../models/index.js";

export const getBranding = async (req, res) => {
  const branding = await BrandingTicket.findAll();
  res.json(branding);
};

export const createBranding = async (req, res) => {
  const branding = await BrandingTicket.create(req.body);
  res.status(201).json(branding);
};

export const updateBranding = async (req, res) => {
  const item = await BrandingTicket.findByPk(req.params.id);
  if (!item) return res.status(404).json({ msg: "Branding no encontrado" });
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
};

export const deleteBranding = async (req, res) => {
  const item = await BrandingTicket.findByPk(req.params.id);
  if (!item) return res.status(404).json({ msg: "Branding no encontrado" });
  await item.destroy();
  res.json({ msg: "Branding eliminado" });
};