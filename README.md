# RestaurantApp
Sistema de gestión para restaurantes compuesto por una API REST y una aplicación móvil multiplataforma. El proyecto permite administrar mesas, pedidos, cuentas, pagos, inventario y reportes desde una aplicación React Native conectada a un backend Node.js.
## Características
- Registro y autenticación de usuarios mediante JWT.
- Gestión de mesas y estados de atención.
- Creación y seguimiento de pedidos por mesa.
- Apertura, actualización y cierre de cuentas.
- Gestión de pagos, descuentos y propinas.
- Reportes de ventas, productos e inventario.
- Administración de inventario, promociones y configuración del restaurante.
- Generación de archivos PDF y Excel desde el backend.
- Comunicación en tiempo real mediante Socket.IO.
- Aplicación móvil para Android, iOS y web con Expo.
- Estado global administrado con Redux Toolkit.
## Arquitectura
```text
RestaurantApp/
└── AppMultiplataforma/
    ├── Backend/     # API REST, persistencia y WebSocket
    └── FrontEnd/    # Aplicación móvil React Native + Expo
```
### Backend
- Node.js con Express.
- Sequelize como ORM.
- SQLite como base de datos local.
- JWT y bcryptjs para autenticación.
- Socket.IO para eventos en tiempo real.
- PDFKit y ExcelJS para exportaciones.
### Frontend
- React Native 0.74.
- Expo SDK 51.
- TypeScript.
- React Navigation.
- Redux Toolkit y RTK Query.
- Socket.IO Client.
## Requisitos
- Node.js LTS.
- npm.
- Expo Go compatible con SDK 51 o un emulador Android/iOS.
## Instalación y ejecución
### 1. Backend
```bash
cd AppMultiplataforma/Backend
npm install
npm run dev
```
El servidor se inicia en:
```text
http://localhost:3000
```
También puede ejecutarse sin Nodemon:
```bash
npm start
```
La base de datos SQLite se crea automáticamente como `database.sqlite` dentro de `Backend/`.
### 2. Frontend
En otra terminal:
```bash
cd AppMultiplataforma/FrontEnd
npm install
npm start
```
Comandos útiles:
```bash
npm run android
npm run ios
npm run web
npm test
```
Durante el desarrollo, la aplicación intenta resolver automáticamente la dirección local del backend. Para un dispositivo físico, ambos dispositivos deben estar en la misma red; si es necesario, configura la dirección del backend en `FrontEnd/src/api/restaurantApi.ts`.
> El proyecto utiliza Expo SDK 51. Si la versión instalada de Expo Go no es compatible, instala una versión compatible o actualiza el proyecto siguiendo la guía oficial de Expo.
## API
Las rutas principales están organizadas por recurso:
| Recurso | Prefijo |
|---|---|
| Autenticación | `/api/auth` |
| Mesas | `/api/mesas` |
| Pedidos | `/api/pedidos` |
| Productos de pedidos | `/api/pedido-productos` |
| Cuentas y pagos | `/api/cuentas` |
| Reportes | `/api/reportes` |
| Inventario | `/api/inventario` |
| Promociones | `/api/promociones` |
| Configuración | `/api/ajustes` |
| Propinas | `/api/propina-config` |
| Branding de tickets | `/api/branding` |
| Cierre de caja | `/api/cierre-caja` |
La documentación de endpoints está disponible en [`AppMultiplataforma/Backend/docs/endpoints.md`](AppMultiplataforma/Backend/docs/endpoints.md).
La mayoría de los endpoints, excepto registro e inicio de sesión, requieren un token JWT:
```http
Authorization: Bearer <access-token>
```
## Estructura principal
```text
Backend/
├── config/          # Configuración de base de datos
├── controllers/     # Lógica de negocio
├── middleware/      # Autenticación y errores
├── models/          # Modelos Sequelize
├── routes/          # Rutas de la API
├── scripts/         # Utilidades administrativas
├── docs/            # Documentación
├── index.js         # Punto de entrada HTTP
└── socket.js        # Configuración Socket.IO
FrontEnd/
├── src/api/         # Cliente RTK Query
├── src/hooks/       # Hooks personalizados
├── src/navigation/  # Navegación de la aplicación
├── src/screens/     # Pantallas
├── src/store/       # Redux Toolkit
└── App.tsx          # Punto de entrada móvil
```
## Estado del proyecto
El flujo base de autenticación, mesas, pedidos y cuentas está implementado. El repositorio también contiene la base del backend para reportes, inventario, promociones, configuración y cierre de caja.
Las siguientes mejoras forman parte del roadmap:
- Flujo completo de inventario y administración.
- Reportes avanzados y exportaciones refinadas.
- Persistencia offline y sincronización de acciones.
- Biometría y gestión avanzada de tokens.
- Pruebas unitarias y de integración.
- Preparación para despliegue en Play Store y App Store.
Consulta el plan detallado en [`AppMultiplataforma/Backend/docs/ROADMAP.md`](AppMultiplataforma/Backend/docs/ROADMAP.md).
## Contribución
1. Crea una rama para tu cambio.
2. Mantén separadas las modificaciones del backend y frontend cuando sea posible.
3. Actualiza la documentación relacionada.
4. Ejecuta las pruebas disponibles antes de abrir un pull request.
## Licencia
Actualmente el proyecto usa la licencia `ISC` en el backend. Revisa los archivos `package.json` antes de distribuirlo o publicarlo como producto.
