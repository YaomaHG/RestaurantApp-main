import Cuenta from "../models/cuenta.js";
import Mesa from "../models/mesa.js";
import Pago from "../models/pago.js";
import { getIO } from "../socket.js";

export const getCuentas = async (req, res) => {
  const cuentas = await Cuenta.findAll({ include: [Mesa, Pago] });
  res.json(cuentas);
};

export const getCuentaActiva = async (req, res) => {
  const cuenta = await Cuenta.findOne({ where: { MesaId: req.params.mesaId, closed: false }, include: [Mesa, Pago] });
  if (!cuenta) return res.status(404).json({ msg: "Sin cuenta activa" });
  res.json(cuenta);
};

export const openCuenta = async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.mesaId);
  if (!mesa) return res.status(404).json({ msg: "Mesa no existe" });
  let cuenta = await Cuenta.findOne({ where: { MesaId: mesa.id, closed: false } });
  if (!cuenta) cuenta = await Cuenta.create({ MesaId: mesa.id });
  mesa.status = "ocupada";
  await mesa.save();
  // emitir actualización de mesas
  const mesas = await Mesa.findAll();
  getIO()?.emit("mesas:update", mesas);
  res.json(cuenta);
};

export const addItemCuenta = async (req, res) => {
  const cuenta = await Cuenta.findOne({ where: { MesaId: req.params.mesaId, closed: false } });
  if (!cuenta) return res.status(404).json({ msg: "Cuenta no existe" });
  cuenta.subtotal += Number(req.body.price);
  cuenta.total = cuenta.subtotal - cuenta.descuento + cuenta.propina;
  await cuenta.save();
  res.json(cuenta);
};

export const addPagoCuenta = async (req, res) => {
  const cuenta = await Cuenta.findOne({ where: { MesaId: req.params.mesaId, closed: false } });
  if (!cuenta) return res.status(404).json({ msg: "Cuenta no existe" });
  const { metodo = "efectivo", monto = 0, referencia } = req.body;
  const pago = await Pago.create({ CuentaId: cuenta.id, metodo, monto, referencia });
  // recalcular total pagado (no cambia total de cuenta, solo se refleja en frontend)
  res.json(pago);
};

export const updateAjustesCuenta = async (req, res) => {
  const cuenta = await Cuenta.findOne({ where: { MesaId: req.params.mesaId, closed: false } });
  if (!cuenta) return res.status(404).json({ msg: "Cuenta no existe" });
  const { descuento = cuenta.descuento, propina = cuenta.propina } = req.body;
  cuenta.descuento = Number(descuento);
  cuenta.propina = Number(propina);
  cuenta.total = cuenta.subtotal - cuenta.descuento + cuenta.propina;
  await cuenta.save();
  res.json(cuenta);
};

export const closeCuenta = async (req, res) => {
  const cuenta = await Cuenta.findOne({ where: { MesaId: req.params.mesaId, closed: false } });
  if (!cuenta) return res.status(404).json({ msg: "Cuenta no existe" });
  const { pagos, descuento = 0, propina = 0 } = req.body;
  cuenta.descuento = descuento;
  cuenta.propina = propina;
  cuenta.total = cuenta.subtotal - descuento + propina;
  cuenta.closed = true;
  await cuenta.save();
  if (Array.isArray(pagos)) {
    for (const p of pagos) await Pago.create({ CuentaId: cuenta.id, ...p });
  }
  const mesa = await Mesa.findByPk(req.params.mesaId);
  mesa.status = "disponible";
  await mesa.save();
  // emitir actualización de mesas (mesa liberada)
  const mesas = await Mesa.findAll();
  getIO()?.emit("mesas:update", mesas);
  res.json({ msg: "Cuenta cerrada", cuenta });
};
