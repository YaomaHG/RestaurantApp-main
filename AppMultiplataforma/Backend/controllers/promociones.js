import { Promocion, Categoria } from "../models/index.js";

export const getPromociones = async (req, res) => {
  const promos = await Promocion.findAll({ include: Categoria });
  res.json(promos);
};

export const getPromocion = async (req, res) => {
  const promo = await Promocion.findByPk(req.params.id);
  if (!promo) return res.status(404).json({ msg: "Promoción no encontrada" });
  res.json(promo);
};

export const createPromocion = async (req, res) => {
  const promo = await Promocion.create(req.body);
  res.status(201).json(promo);
};

export const updatePromocion = async (req, res) => {
  const promo = await Promocion.findByPk(req.params.id);
  if (!promo) return res.status(404).json({ msg: "Promoción no encontrada" });
  Object.assign(promo, req.body);
  await promo.save();
  res.json(promo);
};

export const deletePromocion = async (req, res) => {
  const promo = await Promocion.findByPk(req.params.id);
  if (!promo) return res.status(404).json({ msg: "Promoción no encontrada" });
  await promo.destroy();
  res.json({ msg: "Promoción eliminada" });
};