import Categoria from '../models/categoria';
import Publicacion from '../models/publicacion';
import Rol from '../models/rol';
import Usuario from '../models/usuario';


//Verificar rol existe
 export const rolValido = async (rol_id = 0) => {
    const existeRol = await Rol.findOne({
        where: { id: rol_id }
    });

    if (!existeRol) {
        throw new Error(`Por favor verifique el rol`);
    }
}

//Verificar email existe
 export const emailExiste = async (email: '') => {
    const existeEmail = await Usuario.findOne({
        where: { email: email }
    });
    if (existeEmail) {
        throw new Error(`Ya existe un usuario con ese email: ${email}`);

    }
}

//Verificar existe usuario
export const existeUsuario = async (id: '') => {
    const existeUsuario = await Usuario.findOne({
        where: { id: id }
    });
    if (!existeUsuario) {
        throw new Error(`No existe un usuario para ese id: ${id}`);

    }
}

//Verificar existe categoria
export const existeCategoria = async (categoria: '') => {
    
    const existeUsuario = await Categoria.findOne({
        where: { categoria: categoria }
    });
    if (existeUsuario) {
        throw new Error(`Ya existe la categoria con el nombre: ${categoria}`);

    }
}



export default {rolValido, emailExiste, existeUsuario};