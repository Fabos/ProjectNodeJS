import { DataTypes} from 'sequelize';
import db from '../db/connection';

const Rol = db.define('Roles', {
    rol:{
        type: DataTypes.STRING,
    }

});

export default Rol;