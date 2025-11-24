import express from "express";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./models/index.js";

import authRoutes from "./routes/auth.js";
import mesasRoutes from "./routes/mesas.js";
import pedidosRoutes from "./routes/pedidos.js";
import cuentasRoutes from "./routes/cuentas.js";
import reportesRoutes from "./routes/reportes.js";
import inventarioRoutes from "./routes/inventario.js";
import promocionesRoutes from "./routes/promociones.js";
import ajustesRoutes from "./routes/ajustes.js";
import propinaConfigRoutes from "./routes/propinaConfig.js";
import brandingRoutes from "./routes/branding.js";
import cierreCajaRoutes from "./routes/cierreCaja.js";
import pedidoProductosRoutes from "./routes/pedidoProductos.js";
import errorHandler from "./middleware/error.js";
import { initSocket } from "./socket.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/cuentas", cuentasRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/promociones", promocionesRoutes);
app.use("/api/ajustes", ajustesRoutes);
app.use("/api/propina-config", propinaConfigRoutes);
app.use("/api/branding", brandingRoutes);
app.use("/api/cierre-caja", cierreCajaRoutes);
app.use("/api/pedido-productos", pedidoProductosRoutes);

// Error handler last
app.use(errorHandler);

app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;

(async () => {
  try{
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada (alter true).");
  }catch(err){
    console.warn('sequelize.sync({ alter: true }) falló, intentando sync() simple:', err && err.message ? err.message : err);
    try{
      await sequelize.sync();
      console.log('Base de datos sincronizada (sync simple).');
    }catch(e){
      console.error('No se pudo sincronizar la base de datos:', e);
      process.exit(1);
    }
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en ${PORT}`);
    try{
      const addr = server.address();
      console.log('Server address:', addr);
    }catch(e){ }
  });
  initSocket(server);
})();
