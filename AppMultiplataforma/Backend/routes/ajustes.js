import { Router } from "express";
import { getAjustes, getAjuste, upsertAjuste, deleteAjuste } from "../controllers/ajustes.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
const router = Router();

router.use(authMiddleware);
// Ajustes solo admin
router.get("/", requireRoles("admin"), getAjustes);
router.get("/:clave", requireRoles("admin"), getAjuste);
router.put("/:clave", requireRoles("admin"), upsertAjuste);
router.delete("/:clave", requireRoles("admin"), deleteAjuste);

export default router;