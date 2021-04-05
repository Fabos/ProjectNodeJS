import {BelongsTo, DataTypes} from 'sequelize';
import db from '../db/connection';
import Usuario from '../models/usuario'
import Categoria from '../models/categoria'

const Publicacion = db.define('Publicaciones', {
    publicacion:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
    
});
Publicacion.belongsTo(Usuario);
Publicacion.belongsTo(Categoria);


// Usuario.prototype.toJSON = function () {
//     let values = Object.assign({}, this.get());
 
//     delete values.password;
//     return values;
// }

export default Publicacion;