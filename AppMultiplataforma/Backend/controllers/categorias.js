import Categoria from "../models/categoria.js";

export const getCategorias = async (req, res) => {
  res.json(await Categoria.findAll());
};

export const createCategoria = async (req, res) => {
  res.json(await Categoria.create(req.body));
};
