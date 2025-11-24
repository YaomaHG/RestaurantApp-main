import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, RefreshToken } from "../models/index.js";
import { generarAccessToken } from "../middleware/auth.js";

const JWT_SECRET = process.env.JWT_SECRET || "MiClaveSuperSecreta123!";
const REFRESH_EXPIRES_DAYS = 30;

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Credenciales inválidas" });
  user.ultimoLogin = new Date(); await user.save();
  const accessToken = generarAccessToken(user);
  const refreshTokenValue = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });
  const expiracion = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
  const refreshRecord = await RefreshToken.create({ userId: user.id, token: refreshTokenValue, expiracion });
  res.json({ accessToken, refreshToken: refreshRecord.token, user });
};

export const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ msg: "El email ya está registrado" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, email, password: hashed, rol: rol || "mesero" });
  const accessToken = generarAccessToken(user);
  const refreshTokenValue = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });
  const expiracion = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ userId: user.id, token: refreshTokenValue, expiracion });
  res.json({ accessToken, refreshToken: refreshTokenValue, user });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ msg: "Falta refreshToken" });
  const record = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (record) { record.revocado = true; await record.save(); }
  res.json({ msg: "Sesión cerrada" });
};
