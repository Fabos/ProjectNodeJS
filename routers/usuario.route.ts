import { Router } from 'express';
import { check } from 'express-validator';
import {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
} from '../controllers/usuario.controller';
import { emailExiste, existeUsuario, rolValido } from '../helpers/db-validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { adminRol, tieneRol } from '../middlewares/validar-roles';



const router = Router();

router.get('/',[
    validarJWT, 
    adminRol,
], getUsuarios);

router.get('/:id',[
    validarJWT, 
    tieneRol(1, 2),
], getUsuario);

router.post('/', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min:6}),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email').custom(emailExiste),
    // check('rol', 'El rol no es permitido').isIn(['Administrador', 'Usuario']),
    validarCampos
], postUsuario);

router.put('/:id',[
    validarJWT, 
    tieneRol(2),
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom(existeUsuario),
    validarCampos
], putUsuario);

router.delete('/:id',[
    validarJWT, 
    // adminRol,
    tieneRol(2),
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom(existeUsuario),
    validarCampos
], deleteUsuario);


export default router;