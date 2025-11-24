import { Router } from "express";
import auth from "../middleware/auth.js";
import { getPedidos, getPedidosPorMesa, crearPedido, actualizarPedido, cambiarEstadoPedido } from "../controllers/pedidos.js";
import authMiddleware, { requireRoles } from "../middleware/auth.js";

const router = Router();

// Obtener todos los pedidos
router.use(authMiddleware);
// Pedidos: creación y consulta por mesero; cajero/admin pueden ver todos
router.get("/", requireRoles("cajero", "admin"), getPedidos);

// Obtener pedidos por mesa
router.get("/mesa/:mesaId", requireRoles("mesero", "cajero", "admin"), getPedidosPorMesa);

// Crear un pedido para una mesa
router.post("/", requireRoles("mesero", "admin"), crearPedido);

// Actualizar cantidad, instrucciones o producto del pedido
router.patch("/:id", requireRoles("mesero", "admin"), actualizarPedido);

// Cambiar estado (en_preparacion → listo → servido)
router.patch("/estado/:id", requireRoles("mesero", "cajero", "admin"), cambiarEstadoPedido);

export default router;
