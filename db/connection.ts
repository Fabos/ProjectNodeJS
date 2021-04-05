import {Sequelize} from 'sequelize';


const db = new Sequelize('RRSS', 'root', '1121903105adgjmp', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;

