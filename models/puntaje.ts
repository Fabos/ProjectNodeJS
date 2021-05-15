import { DataTypes} from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';

const Puntaje = db.define('Puntajes', {
    puntaje:{
        type: DataTypes.DOUBLE,
    },

});
Puntaje.belongsTo(Usuario);

export default Puntaje;