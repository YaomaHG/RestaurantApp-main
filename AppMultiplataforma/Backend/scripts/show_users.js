import { User, sequelize } from '../models/index.js';

async function main(){
  try{
    await sequelize.authenticate();
    const users = await User.findAll();
    console.log('Usuarios en la BD:');
    users.forEach(u => {
      console.log({ id: u.id, nombre: u.nombre, email: u.email, passwordHash: u.password, rol: u.rol });
    });
    process.exit(0);
  }catch(err){
    console.error('Error leyendo usuarios:', err);
    process.exit(1);
  }
}

main();
