import { sequelize } from '../models/index.js';

async function main(){
  try{
    await sequelize.query('DROP TABLE IF EXISTS users_backup');
    console.log('Dropped users_backup (if it existed).');
    process.exit(0);
  }catch(e){
    console.error('Error dropping users_backup:', e);
    process.exit(1);
  }
}

main();
