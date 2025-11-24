# RestaurantApp Mobile (Frontend)

Primer scaffolding React Native + Expo.

## Requisitos
- Node.js LTS
- Expo CLI (`npm i -g expo-cli` si desea)

## Instalación
```powershell
cd AppMultiplataforma/FrontEnd
npm install
npm run start
```

Presione `a` para Android emulator, `w` para web, o escanee código QR.

## Estructura inicial
- `App.tsx`: Provider Redux y navegación raíz.
- `src/api/restaurantApi.ts`: RTK Query base (login, mesas).
- `src/store/`: configuración store + slices básicos.
- `src/screens/`: `LoginScreen`, `MesasScreen`.
- `src/navigation/RootNavigator.tsx`: Drawer simple condicional por sesión.

## Próximos pasos
1. Añadir slices y endpoints restantes (pedidos, cuentas, inventario).
2. Integrar refresh token (SecureStore) y biometría.
3. Socket.io para eventos en tiempo real.
4. Pantallas detalle pedido y cuenta.
5. Theming oscuro/claro.
6. Offline queue.
7. Pruebas unitarias y integración.

## Variables de entorno y notas sobre `BASE_URL`
- El cliente intenta resolver la URL del backend automáticamente en desarrollo:
	- Si ejecutas Expo en modo desarrollo, el cliente lee el `debuggerHost` de Expo y construye `http://<TU_IP_LOCAL>:3000/api` (útil para probar desde dispositivo físico).
	- En emulador Android se utiliza `http://10.0.2.2:3000/api` (mapea al `localhost` del host).
	- Si no puede resolver nada, por defecto usa `http://localhost:3000/api`.

Si usas un dispositivo físico y la app no llega al backend, reemplaza manualmente `BASE_URL` en `src/api/restaurantApi.ts` por `http://<TU_IP_LOCAL>:3000/api` o inicia Expo con `--tunnel`.

## Scripts útiles
```powershell
npm run android
npm run ios
npm run web
npm test
```
