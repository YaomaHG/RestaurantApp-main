import { sequelize } from '../models/index.js';

async function main(){
  try{
    const [[{count}]] = await sequelize.query("SELECT COUNT(*) as count FROM users_backup");
    console.log('users_backup count =', count);
    const [rows] = await sequelize.query("SELECT id, nombre, email, rol FROM users_backup LIMIT 10");
    console.log('Sample rows from users_backup:');
    console.table(rows);
    process.exit(0);
  }catch(e){
    console.error('Error inspecting users_backup:', e);
    process.exit(1);
  }
}

main();
