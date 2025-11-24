import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, RefreshToken, sequelize } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'MiClaveSuperSecreta123!';
const REFRESH_EXPIRES_DAYS = 30;

async function main(){
  try{
    await sequelize.sync();
    const email = 'admin@example.com';
    const exists = await User.findOne({ where: { email } });
    if(exists){
      console.log('Usuario ya existe:', email);
      process.exit(0);
    }
    const password = 'admin123';
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre: 'Admin Ejemplo', email, password: hashed, rol: 'admin' });
    const refreshTokenValue = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: `${REFRESH_EXPIRES_DAYS}d` });
    const expiracion = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
    await RefreshToken.create({ userId: user.id, token: refreshTokenValue, expiracion });
    console.log('Usuario creado: ', { email, password });
    process.exit(0);
  }catch(err){
    console.error('Error creando usuario de ejemplo:', err);
    process.exit(1);
  }
}

main();
