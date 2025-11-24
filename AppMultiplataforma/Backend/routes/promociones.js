import { Router } from "express";
import { getPromociones, getPromocion, createPromocion, updatePromocion, deletePromocion } from "../controllers/promociones.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
const router = Router();

router.use(authMiddleware);
// Promociones solo admin
router.get("/", requireRoles("admin"), getPromociones);
router.get("/:id", requireRoles("admin"), getPromocion);
router.post("/", requireRoles("admin"), createPromocion);
router.put("/:id", requireRoles("admin"), updatePromocion);
router.delete("/:id", requireRoles("admin"), deletePromocion);

export default router;