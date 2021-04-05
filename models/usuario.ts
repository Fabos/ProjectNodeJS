import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuarios', {
    nombre:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    password:{
        type: DataTypes.STRING
    },
    rol_id:{
        type: DataTypes.INTEGER,
    }


});


// Usuario.prototype.toJSON = function () {
//     let values = Object.assign({}, this.get());
 
//     delete values.password;
//     return values;
// }

export default Usuario;