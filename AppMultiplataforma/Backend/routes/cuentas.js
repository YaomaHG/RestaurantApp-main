import { Router } from "express";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
import { getCuentas, openCuenta, addItemCuenta, closeCuenta, getCuentaActiva, addPagoCuenta, updateAjustesCuenta } from "../controllers/cuentas.js";

const router = Router();

// Obtener todas las cuentas
router.use(authMiddleware);
// Ver cuentas: cajero y admin
router.get("/", requireRoles("cajero", "admin"), getCuentas);
// Cuenta activa de una mesa (mesero, cajero, admin)
router.get("/activa/:mesaId", requireRoles("mesero", "cajero", "admin"), getCuentaActiva);

// Abrir cuenta para una mesa
// Abrir cuenta: mesero, admin
router.post("/abrir/:mesaId", requireRoles("mesero", "admin"), openCuenta);

// Agregar item (subtotal) a la cuenta
// Agregar item: mesero, admin
router.post("/item/:mesaId", requireRoles("mesero", "admin"), addItemCuenta);

// Agregar pago parcial (cajero, admin)
router.post("/pago/:mesaId", requireRoles("cajero", "admin"), addPagoCuenta);

// Actualizar ajustes (descuento / propina) (cajero, admin)
router.patch("/ajustes/:mesaId", requireRoles("cajero", "admin"), updateAjustesCuenta);

// Cerrar cuenta (pagos, propina, descuentos)
// Cerrar cuenta: cajero o admin
router.post("/cerrar/:mesaId", requireRoles("cajero", "admin"), closeCuenta);

export default router;
