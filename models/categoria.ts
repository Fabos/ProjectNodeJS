import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Categoria = db.define('Categorias', {
    categoria:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },

});


// Usuario.prototype.toJSON = function () {
//     let values = Object.assign({}, this.get());
 
//     delete values.password;
//     return values;
// }

export default Categoria;