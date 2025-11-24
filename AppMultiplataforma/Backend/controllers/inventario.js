import { Inventario, Producto, MovimientoInventario, sequelize } from "../models/index.js";
import { Op } from "sequelize";

export const getInventario = async (req, res) => {
  const items = await Inventario.findAll({ include: Producto });
  res.json(items);
};

export const getInventarioProducto = async (req, res) => {
  const item = await Inventario.findOne({ where: { productoId: req.params.productoId } });
  if (!item) return res.status(404).json({ msg: "Inventario no encontrado" });
  res.json(item);
};

export const actualizarStockMinimo = async (req, res) => {
  const { stockMinimo } = req.body;
  const item = await Inventario.findOne({ where: { productoId: req.params.productoId } });
  if (!item) return res.status(404).json({ msg: "Inventario no encontrado" });
  item.stockMinimo = stockMinimo;
  await item.save();
  res.json(item);
};

export const registrarMovimiento = async (req, res) => {
  const { productoId, tipo, cantidad, motivo, usuarioId } = req.body;
  const inv = await Inventario.findOne({ where: { productoId } });
  if (!inv) return res.status(404).json({ msg: "Inventario no encontrado" });
  if (tipo === "salida") inv.stockActual -= cantidad;
  else if (tipo === "entrada") inv.stockActual += cantidad;
  else if (tipo === "ajuste") inv.stockActual = cantidad; // ajuste directo
  inv.ultimaActualizacion = new Date();
  await inv.save();
  const mov = await MovimientoInventario.create({ productoId, tipo, cantidad, motivo, usuarioId });
  res.json({ inventario: inv, movimiento: mov });
};

export const alertasStock = async (req, res) => {
  // columna vs columna: stockActual < stockMinimo
  const bajos = await Inventario.findAll({
    where: sequelize.where(sequelize.col("stockActual"), Op.lt, sequelize.col("stockMinimo")),
    include: Producto,
  });
  res.json(bajos);
};