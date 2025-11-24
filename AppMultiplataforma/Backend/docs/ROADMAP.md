 ERROR  Project is incompatible with this version of Expo Go

• The installed version of Expo Go is for SDK 54.
• The project you opened uses SDK 51.

How to fix this error:
Either upgrade this project to SDK 54 or install an older version of Expo Go that is compatible with your project.  

<a href='https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/'>Learn how to upgrade to SDK 54.</a>        

<a href='https://expo.dev/go?sdkVersion=51&platform=android&device=true'>Learn how to install Expo Go for SDK 51</a>.# Roadmap de Implementación

Duración estimada: 8 Sprints (1 semana cada uno). Porcentajes relativos al esfuerzo total (100%).

## Resumen de Porcentajes
- Sprint 1: 12%
- Sprint 2: 13%
- Sprint 3: 13%
- Sprint 4: 14%
- Sprint 5: 14%
- Sprint 6: 12%
- Sprint 7: 11%
- Sprint 8: 11%

## Dependencias Clave
- Backend base y autenticación (S1 prerequisite para todo).
- Modelado completo antes de cuentas avanzadas (S2-S3).
- Reportes requieren datos históricos (S4+).
- Offline + biometría tras flujo principal estable (S6+).

## Detalle por Sprint
### Sprint 1 (12%) – Fundamentos Backend y Mesas
- Configuración inicial backend, Express, Sequelize y modelos base.
- Autenticación básica (login/register, JWT temporal).
- CRUD Mesas + estados + asignación mesero.
- Estructura repositorio móvil (Expo) + pantalla Login + Mesas básica.
- Revisión inicial de seguridad (roles concepto).
- Entregables: Backend funcional mínimo, Frontend conecta y lista mesas.

### Sprint 2 (13%) – Pedidos y Pivot Detallada
- Implementar modelo `PedidoProducto` (cantidad, notas, estado cocina).
- Controladores pedidos y flujo de estado (preparación → listo → servido).
- WebSocket (eventos mesas y pedidos básicos).
- Pantalla Detalle Mesa y creación de pedido en frontend.
- Validaciones y manejo de errores estándar.
- Entregables: Pedidos end-to-end, actualizaciones en tiempo real básicas.

### Sprint 3 (13%) – Cuentas y Split
- Extensión modelo `Cuenta`, `LineaCuenta`, cálculos subtotal/propina/ descuentos.
- Endpoints: abrir, agregar líneas, dividir, aplicar descuento, propina.
- Pagos (múltiples métodos) + ticket PDF simple.
- Pantallas Cuenta y Pago en frontend.
- Auditoría de acciones sensibles (cierre cuenta, descuentos).
- Entregables: Flujo completo cierre de cuenta y ticket cliente.

### Sprint 4 (14%) – Corte de Caja y Reportes Base
- Modelo `CierreCaja` + generación diaria manual/automática.
- Reportes agregaciones: ventas diarias/semanales/mensuales, top productos.
- Exportación PDF y Excel inicial.
- Frontend: vista corte de caja y descarga reportes.
- Hardening seguridad (refresh tokens, revocación completa, roles estrictos).
- Entregables: Fin de día operativo y visualización básica de métricas.

### Sprint 5 (14%) – Inventario y Configuración Avanzada
- Modelos `Inventario`, `MovimientoInventario`, alertas stock.
- Promociones, PropinaConfig, AjustesSistema y BrandingTicket.
- Pantallas administración configuración y inventario.
- WebSocket alertas inventario y pedidos listos cocina.
- Entregables: Gestión insumos y personalización completa del sistema.

### Sprint 6 (12%) – Offline, Biometría y Optimización UX
- Implementar cola offline (outbox) y persistencia crítica (mesas/pedidos activos).
- Integración biometría (SecureStore refresh + local-authentication).
- Temas (oscuro/claro) y mejoras accesibilidad.
- Optimizar queries y añadir índices DB.
- Entregables: Experiencia resiliente sin conexión y seguridad mejorada.

### Sprint 7 (11%) – Reportes Avanzados y Rendimiento
- Desempeño meseros, propinas acumuladas, alertas inventario refinadas.
- Sentry (u otro) para monitoreo errores móviles.
- Pruebas unitarias + integración críticas (auth, pedidos, cierre cuenta).
- Refinar PDF/Excel (branding, totales categorizados).
- Entregables: Suite de reportes completa y mayor calidad.

### Sprint 8 (11%) – QA Final, Preparación Deploy y Documentación
- Revisión seguridad (fugas token, sanitización inputs, rate-limit mínimo).
- Script semillas demo y documentación operativa.
- Checklist App Store / Play Store (iconos, permisos, splash).
- Ajustes finales performance (bundle size, lazy loading screens).
- Entregables: Versión candidata para producción.

## Riesgos y Mitigaciones
- Cambios de modelo tardíos: mantener migraciones controladas y congelar esquema tras S3.
- Rendimiento en reportes grandes: usar agregaciones SQL y limitar exportaciones (paginación) desde S4.
- Offline inconsistencias: cola transaccional y retry exponencial (registro fallos) desde S6.
- Seguridad tokens: rotación refresh (revocación manual) y expiraciones cortas access desde S4.

## KPIs por Sprint
- S1: Tiempo login < 2s, error rate <5%.
- S3: Cierre cuenta completo < 10s flujo.
- S4: Generar PDF estándar < 2s con <500 cuentas.
- S6: Reintento offline exitoso >= 90%.
- S7: Reporte ventas mensual < 3s.

## Próximos Inmediatos
- Ejecutar instalación dependencias PDF/Excel recién añadidas.
- Validar endpoints reportes con datos de prueba.
- Iniciar Sprint 1 checklist retro si se parte de cero (parte ya adelantada).

