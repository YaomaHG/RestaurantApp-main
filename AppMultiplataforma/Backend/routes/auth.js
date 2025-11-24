import { Router } from "express";
import { login, register, logout } from "../controllers/auth.js";
import { refreshAccess, revokeRefresh } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshAccess);
router.post("/refresh/:id/revoke", revokeRefresh);

export default router;
