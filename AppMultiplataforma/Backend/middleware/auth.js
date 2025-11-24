import jwt from "jsonwebtoken";
import { User, RefreshToken } from "../models/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "MiClaveSuperSecreta123!";
const ACCESS_EXPIRES = "15m";

export const generarAccessToken = (user) =>
  jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });

export const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user || !user.activo) return res.status(401).json({ message: "Usuario no válido" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const requireRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "No autenticado" });
  if (!roles.includes(req.user.rol)) return res.status(403).json({ message: "No autorizado" });
  next();
};

export const refreshAccess = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: "Falta refreshToken" });
  const record = await RefreshToken.findOne({ where: { token: refreshToken, revocado: false } });
  if (!record) return res.status(401).json({ message: "Refresh inválido" });
  // expiración simple
  if (record.expiracion && new Date(record.expiracion) < new Date()) {
    return res.status(401).json({ message: "Refresh expirado" });
  }
  const user = await User.findByPk(record.userId);
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });
  const accessToken = generarAccessToken(user);
  res.json({ accessToken });
};

export const revokeRefresh = async (req, res) => {
  const { id } = req.params;
  const record = await RefreshToken.findByPk(id);
  if (!record) return res.status(404).json({ message: "Token no encontrado" });
  record.revocado = true; await record.save();
  res.json({ message: "Revocado" });
};

export default authMiddleware;
