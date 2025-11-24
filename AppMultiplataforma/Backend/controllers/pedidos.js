import Pedido from "../models/pedido.js";
import Mesa from "../models/mesa.js";
import Producto from "../models/producto.js";
import { getIO } from "../socket.js";

export const getPedidos = async (req, res) => {
  const pedidos = await Pedido.findAll({ include: [Producto, Mesa] });
  res.json(pedidos);
};

export const getPedidosPorMesa = async (req, res) => {
  const pedidos = await Pedido.findAll({
    where: { MesaId: req.params.mesaId },
    include: Producto,
  });
  res.json(pedidos);
};

export const crearPedido = async (req, res) => {
  const pedido = await Pedido.create(req.body);
  const pedidosMesa = await Pedido.findAll({ where: { MesaId: pedido.MesaId }, include: Producto });
  getIO()?.emit("pedidos:update", { mesaId: pedido.MesaId, pedidos: pedidosMesa });
  res.json(pedido);
};

export const actualizarPedido = async (req, res) => {
  const p = await Pedido.findByPk(req.params.id);
  if (!p) return res.status(404).json({ msg: "Pedido no encontrado" });
  Object.assign(p, req.body);
  await p.save();
  const pedidosMesa = await Pedido.findAll({ where: { MesaId: p.MesaId }, include: Producto });
  getIO()?.emit("pedidos:update", { mesaId: p.MesaId, pedidos: pedidosMesa });
  res.json(p);
};

export const cambiarEstadoPedido = async (req, res) => {
  const p = await Pedido.findByPk(req.params.id);
  if (!p) return res.status(404).json({ msg: "Pedido no encontrado" });
  // El campo del modelo es 'estado'
  p.estado = req.body.estado;
  await p.save();
  getIO()?.emit("pedidos:estado", { id: p.id, estado: p.estado, mesaId: p.MesaId });
  res.json(p);
};
