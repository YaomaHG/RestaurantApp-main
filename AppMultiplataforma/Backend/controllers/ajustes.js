import { AjusteSistema } from "../models/index.js";

export const getAjustes = async (req, res) => {
  const ajustes = await AjusteSistema.findAll();
  res.json(ajustes);
};

export const getAjuste = async (req, res) => {
  const ajuste = await AjusteSistema.findByPk(req.params.clave);
  if (!ajuste) return res.status(404).json({ msg: "Ajuste no encontrado" });
  res.json(ajuste);
};

export const upsertAjuste = async (req, res) => {
  const { valor } = req.body;
  const [ajuste] = await AjusteSistema.upsert({ clave: req.params.clave, valor });
  res.json(ajuste);
};

export const deleteAjuste = async (req, res) => {
  const ajuste = await AjusteSistema.findByPk(req.params.clave);
  if (!ajuste) return res.status(404).json({ msg: "Ajuste no encontrado" });
  await ajuste.destroy();
  res.json({ msg: "Ajuste eliminado" });
};