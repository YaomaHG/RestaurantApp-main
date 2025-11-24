import { sequelize, Cuenta, Pago, Producto, PedidoProducto, User, Inventario } from "../models/index.js";
import { Op } from "sequelize";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import { format } from "date-fns";

const parseRange = (req) => {
  const { from, to } = req.query;
  const inicio = from ? new Date(from) : new Date();
  if (!from) inicio.setHours(0, 0, 0, 0);
  const fin = to ? new Date(to) : new Date();
  if (!to) fin.setHours(23, 59, 59, 999);
  return { inicio, fin };
};

export const ventasDiarias = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  const cuentas = await Cuenta.findAll({ where: { estado: "cerrada", fechaCierre: { [Op.between]: [inicio, fin] } } });
  const total = cuentas.reduce((a, c) => a + c.total, 0);
  const propinas = cuentas.reduce((a, c) => a + c.propina, 0);
  res.json({ tipo: "diarias", fecha: format(inicio, "yyyy-MM-dd"), total, propinas, cantidad: cuentas.length });
};

export const ventasSemanales = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  // Agrupar por día usando raw query
  const [rows] = await sequelize.query(`SELECT strftime('%Y-%m-%d', fechaCierre) as dia, SUM(total) as total, SUM(propina) as propinas, COUNT(*) as cuentas FROM cuentas WHERE estado='cerrada' AND fechaCierre BETWEEN :ini AND :fin GROUP BY dia ORDER BY dia`, { replacements: { ini: inicio.toISOString(), fin: fin.toISOString() } });
  res.json({ tipo: "semanales", rango: { inicio, fin }, dias: rows });
};

export const ventasMensuales = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  const [rows] = await sequelize.query(`SELECT strftime('%Y-%m', fechaCierre) as mes, SUM(total) as total, SUM(propina) as propinas, COUNT(*) as cuentas FROM cuentas WHERE estado='cerrada' AND fechaCierre BETWEEN :ini AND :fin GROUP BY mes ORDER BY mes` ,{ replacements: { ini: inicio.toISOString(), fin: fin.toISOString() } });
  res.json({ tipo: "mensuales", rango: { inicio, fin }, meses: rows });
};

export const productosMasVendidos = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  const [rows] = await sequelize.query(`SELECT p.nombre, SUM(pp.cantidad) as cantidad, SUM(pp.cantidad * pp.precioUnitario) as importe FROM pedido_productos pp JOIN productos p ON p.id=pp.productoId JOIN pedidos ped ON ped.id=pp.pedidoId JOIN mesas m ON m.id=ped.MesaId WHERE ped.servidoAt BETWEEN :ini AND :fin GROUP BY p.nombre ORDER BY cantidad DESC LIMIT 20`, { replacements: { ini: inicio.toISOString(), fin: fin.toISOString() } });
  res.json({ top: rows });
};

export const rendimientoMeseros = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  const [rows] = await sequelize.query(`SELECT u.nombre as mesero, COUNT(c.id) as cuentas, SUM(c.total) as ventas, SUM(c.propina) as propinas FROM cuentas c JOIN mesas m ON m.id=c.MesaId JOIN users u ON u.id=m.meseroAsignadoId WHERE c.estado='cerrada' AND c.fechaCierre BETWEEN :ini AND :fin GROUP BY mesero ORDER BY ventas DESC`, { replacements: { ini: inicio.toISOString(), fin: fin.toISOString() } });
  res.json({ meseros: rows });
};

export const inventarioInsumos = async (req, res) => {
  const bajos = await Inventario.findAll({ where: sequelize.where(sequelize.col("stockActual"), Op.lt, sequelize.col("stockMinimo")) });
  res.json({ alertas: bajos });
};

export const exportarPDF = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  const cuentas = await Cuenta.findAll({ where: { estado: "cerrada", fechaCierre: { [Op.between]: [inicio, fin] } } });
  const total = cuentas.reduce((a, c) => a + c.total, 0);
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=reporte.pdf");
  doc.fontSize(18).text("Reporte de Ventas", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Rango: ${format(inicio, 'yyyy-MM-dd')} - ${format(fin, 'yyyy-MM-dd')}`);
  doc.text(`Total ventas: $${total.toFixed(2)}`);
  doc.text(`Cuentas cerradas: ${cuentas.length}`);
  doc.moveDown();
  cuentas.slice(0,50).forEach(c => doc.text(`Cuenta #${c.id} - Total: $${c.total.toFixed(2)} - Propina: $${c.propina.toFixed(2)}`));
  doc.end();
  doc.pipe(res);
};

export const exportarExcel = async (req, res) => {
  const { inicio, fin } = parseRange(req);
  const cuentas = await Cuenta.findAll({ where: { estado: "cerrada", fechaCierre: { [Op.between]: [inicio, fin] } } });
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Ventas");
  ws.addRow(["ID", "Mesa", "Total", "Propina", "Fecha Cierre"]);
  cuentas.forEach(c => ws.addRow([c.id, c.MesaId, c.total, c.propina, c.fechaCierre]));
  const buf = await wb.xlsx.writeBuffer();
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=ventas.xlsx");
  res.send(buf);
};
