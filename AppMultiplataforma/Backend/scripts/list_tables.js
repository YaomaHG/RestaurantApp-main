import { sequelize } from '../models/index.js';

async function main(){
  try{
    const [results] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;");
    console.log('Tables in SQLite DB:');
    results.forEach(r => console.log(r.name));
    process.exit(0);
  }catch(e){
    console.error('Error listing tables:', e);
    process.exit(1);
  }
}

main();
