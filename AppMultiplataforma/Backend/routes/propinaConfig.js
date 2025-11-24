import { Router } from "express";
import { getPropinaConfig, setPropinaConfig, updatePropinaConfig, deletePropinaConfig } from "../controllers/propinaConfig.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
const router = Router();

router.use(authMiddleware);
// Configuración de propina solo admin
router.get("/", requireRoles("admin"), getPropinaConfig);
router.post("/", requireRoles("admin"), setPropinaConfig);
router.put("/:id", requireRoles("admin"), updatePropinaConfig);
router.delete("/:id", requireRoles("admin"), deletePropinaConfig);

export default router;