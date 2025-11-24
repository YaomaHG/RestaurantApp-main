import { CierreCaja, Pago, Cuenta, User } from "../models/index.js";
import { Op } from "sequelize";

export const generarCierre = async (req, res) => {
  const { usuarioId, fecha } = req.body;
  const targetDate = fecha ? new Date(fecha) : new Date();
  const inicio = new Date(targetDate); inicio.setHours(0,0,0,0);
  const fin = new Date(targetDate); fin.setHours(23,59,59,999);

  const cuentasCerradas = await Cuenta.findAll({ where: { estado: "cerrada", fechaCierre: { [Op.between]: [inicio, fin] } } });
  const pagos = await Pago.findAll({ include: Cuenta, where: { fechaPago: { [Op.between]: [inicio, fin] } } });

  let totalVentas = 0; let totalPropinas = 0; let efectivo=0; let tarjeta=0; let transferencia=0;
  cuentasCerradas.forEach(c => { totalVentas += c.total; totalPropinas += c.propina; });
  pagos.forEach(p => { if (p.metodo === 'efectivo') efectivo += p.monto; else if (p.metodo === 'tarjeta') tarjeta += p.monto; else if (p.metodo === 'transferencia') transferencia += p.monto; });

  const cierre = await CierreCaja.create({ usuarioId, totalVentas, totalPropinas, efectivo, tarjeta, transferencia });
  res.status(201).json(cierre);
};

export const listarCierres = async (req, res) => {
  const cierres = await CierreCaja.findAll({ include: User });
  res.json(cierres);
};

export const getCierre = async (req, res) => {
  const cierre = await CierreCaja.findByPk(req.params.id);
  if (!cierre) return res.status(404).json({ msg: 'Cierre no encontrado' });
  res.json(cierre);
};

export const marcarEnviadoEmail = async (req, res) => {
  const cierre = await CierreCaja.findByPk(req.params.id);
  if (!cierre) return res.status(404).json({ msg: 'Cierre no encontrado' });
  cierre.enviadoEmail = true; await cierre.save();
  res.json(cierre);
};