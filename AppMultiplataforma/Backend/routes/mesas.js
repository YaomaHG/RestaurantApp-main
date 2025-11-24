import { Router } from "express";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
import { getMesas, getMesaById, createMesa, updateMesa, combinarMesas, dividirMesa } from "../controllers/mesa.js";

const router = Router();

// Obtener todas las mesas
router.use(authMiddleware);
// Mesas: acceso mesero, cajero, admin
router.get("/", requireRoles("mesero", "cajero", "admin"), getMesas);

// Obtener mesa por ID
router.get("/:id", requireRoles("mesero", "cajero", "admin"), getMesaById);

// Crear mesa nueva
// Crear / modificar mesas: solo admin
router.post("/", requireRoles("admin"), createMesa);

// Actualizar mesa (estado, capacidad, etc.)
router.put("/:id", requireRoles("admin"), updateMesa);

// Combinar mesas
router.post("/combinar", requireRoles("admin", "cajero"), combinarMesas);

// Dividir una mesa
router.post("/dividir/:id", requireRoles("admin", "cajero"), dividirMesa);

export default router;
