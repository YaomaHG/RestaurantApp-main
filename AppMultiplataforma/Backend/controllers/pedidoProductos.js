import { PedidoProducto, Pedido, Producto } from "../models/index.js";

export const listarPorPedido = async (req, res) => {
  const items = await PedidoProducto.findAll({ where: { pedidoId: req.params.pedidoId }, include: Producto });
  res.json(items);
};

export const agregarProductoPedido = async (req, res) => {
  const { productoId, cantidad, precioUnitario, notas } = req.body;
  const item = await PedidoProducto.create({ pedidoId: req.params.pedidoId, productoId, cantidad, precioUnitario, notas });
  res.status(201).json(item);
};

export const actualizarPedidoProducto = async (req, res) => {
  const item = await PedidoProducto.findByPk(req.params.id);
  if (!item) return res.status(404).json({ msg: "Item no encontrado" });
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
};

export const eliminarPedidoProducto = async (req, res) => {
  const item = await PedidoProducto.findByPk(req.params.id);
  if (!item) return res.status(404).json({ msg: "Item no encontrado" });
  await item.destroy();
  res.json({ msg: "Item eliminado" });
};