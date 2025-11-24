import { Router } from "express";
import { getInventario, getInventarioProducto, actualizarStockMinimo, registrarMovimiento, alertasStock } from "../controllers/inventario.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);
// Inventario solo admin o cajero
router.get("/", requireRoles("cajero", "admin"), getInventario);
router.get("/alertas", requireRoles("cajero", "admin"), alertasStock);
router.get("/producto/:productoId", requireRoles("cajero", "admin"), getInventarioProducto);
router.put("/producto/:productoId/stock-minimo", requireRoles("admin"), actualizarStockMinimo);
router.post("/movimiento", requireRoles("cajero", "admin"), registrarMovimiento);

export default router;