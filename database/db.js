import {Sequelize} from 'sequelize';

const db = new Sequelize('flexi', 'root', 'rossymarin.18',{
    host: 'localhost',
    dialect: 'mysql'
}, {define:{freezeTableName:true}})

export default db;