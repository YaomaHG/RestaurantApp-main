import Producto from "../models/producto.js";
import Categoria from "../models/categoria.js";

export const getProductos = async (req, res) => {
  const productos = await Producto.findAll({ include: Categoria });
  res.json(productos);
};

export const createProducto = async (req, res) => {
  const producto = await Producto.create(req.body);
  res.json(producto);
};

export const updateProducto = async (req, res) => {
  const p = await Producto.findByPk(req.params.id);
  if (!p) return res.status(404).json({ msg: "Producto no encontrado" });
  Object.assign(p, req.body);
  await p.save();
  res.json(p);
};
