import { Router } from "express";
import { listarPorPedido, agregarProductoPedido, actualizarPedidoProducto, eliminarPedidoProducto } from "../controllers/pedidoProductos.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";
const router = Router();

router.use(authMiddleware);
// Items de pedido: mesero y admin para crear/editar; cajero puede consultar
router.get("/pedido/:pedidoId", requireRoles("mesero", "cajero", "admin"), listarPorPedido);
router.post("/pedido/:pedidoId", requireRoles("mesero", "admin"), agregarProductoPedido);
router.put("/:id", requireRoles("mesero", "admin"), actualizarPedidoProducto);
router.delete("/:id", requireRoles("mesero", "admin"), eliminarPedidoProducto);

export default router;