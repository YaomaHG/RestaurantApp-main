import { Router } from "express";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
import {
  ventasDiarias,
  ventasSemanales,
  ventasMensuales,
  productosMasVendidos,
  rendimientoMeseros,
  inventarioInsumos,
  exportarPDF,
  exportarExcel,
} from "../controllers/reportes.js";

const router = Router();

// Ventas por rango de tiempo
router.use(authMiddleware);
// Reportes: solo admin y cajero
router.get("/ventas/diarias", requireRoles("cajero", "admin"), ventasDiarias);
router.get("/ventas/semanales", requireRoles("cajero", "admin"), ventasSemanales);
router.get("/ventas/mensuales", requireRoles("cajero", "admin"), ventasMensuales);

// Productos más vendidos
router.get("/productos/top", requireRoles("cajero", "admin"), productosMasVendidos);

// Rendimiento de meseros
router.get("/meseros/rendimiento", requireRoles("admin"), rendimientoMeseros);

// Inventario (alertas de stock bajo)
router.get("/inventario", requireRoles("cajero", "admin"), inventarioInsumos);

// Exportación de reportes
router.get("/export/pdf", requireRoles("cajero", "admin"), exportarPDF);
router.get("/export/excel", requireRoles("cajero", "admin"), exportarExcel);

export default router;
