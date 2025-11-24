import { Router } from "express";
import { generarCierre, listarCierres, getCierre, marcarEnviadoEmail } from "../controllers/cierreCaja.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
const router = Router();

router.use(authMiddleware);
// Cierre de caja: cajero o admin
router.post("/", requireRoles("cajero", "admin"), generarCierre);
router.get("/", requireRoles("cajero", "admin"), listarCierres);
router.get("/:id", requireRoles("cajero", "admin"), getCierre);
router.post("/:id/enviar-email", requireRoles("cajero", "admin"), marcarEnviadoEmail);

export default router;