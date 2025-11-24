import { Router } from "express";
import { getBranding, createBranding, updateBranding, deleteBranding } from "../controllers/brandingTicket.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
const router = Router();

router.use(authMiddleware);
// Branding solo admin
router.get("/", requireRoles("admin"), getBranding);
router.post("/", requireRoles("admin"), createBranding);
router.put("/:id", requireRoles("admin"), updateBranding);
router.delete("/:id", requireRoles("admin"), deleteBranding);

export default router;