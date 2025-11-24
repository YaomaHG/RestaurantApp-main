import { Mesa } from "../models/index.js";
import { getIO } from "../socket.js";

export const getMesas = async (req, res) => {
  const mesas = await Mesa.findAll();
  res.json(mesas);
};

export const getMesaById = async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.id);
  if (!mesa) return res.status(404).json({ msg: "Mesa no encontrada" });
  res.json(mesa);
};

export const createMesa = async (req, res) => {
  const mesa = await Mesa.create(req.body);
  const mesas = await Mesa.findAll();
  getIO()?.emit("mesas:update", mesas);
  res.json(mesa);
};

export const updateMesa = async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.id);
  if (!mesa) return res.status(404).json({ msg: "Mesa no encontrada" });
  Object.assign(mesa, req.body);
  await mesa.save();
  const mesas = await Mesa.findAll();
  getIO()?.emit("mesas:update", mesas);
  res.json(mesa);
};

export const combinarMesas = async (req, res) => {
  const { mesas } = req.body;
  const all = await Mesa.findAll();
  getIO()?.emit("mesas:update", all);
  res.json({ msg: "Mesas combinadas", mesas });
};

export const dividirMesa = async (req, res) => {
  const all = await Mesa.findAll();
  getIO()?.emit("mesas:update", all);
  res.json({ msg: "Mesa dividida", id: req.params.id });
};
