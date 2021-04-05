import { Router } from 'express';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import { listarPublicaciones, postPublicacion, putPublicacion, deletePublicacion, listarPublicacionesIdCategoria, listarPublicacionesIdUsuario } from '../controllers/publicacion.controller';
import validarJWT from '../middlewares/validar-jwt';
import { tieneRol } from '../middlewares/validar-roles';


const router = Router();

router.get('/', [
    validarJWT,
    tieneRol(2),
], listarPublicaciones);

router.get('/categoria/:id',[
    validarJWT,
    tieneRol(2),
], listarPublicacionesIdCategoria);

router.get('/usuario/:id',[
    validarJWT,
    tieneRol(2),
], listarPublicacionesIdUsuario);

router.post('/', [
    validarJWT,
    tieneRol(2),
    check('publicacion', 'Debe ingresar una publicacion').not().isEmpty(),
    validarCampos
], postPublicacion);

router.put('/:id',[
    validarJWT,
    tieneRol(2),
    check('publicacion', 'Debe ingresar una publicacion').not().isEmpty(),
    check('id', 'No es un id valido').isNumeric(),
    validarCampos
], putPublicacion);


router.delete('/:id',[
    validarJWT, 
    tieneRol(1, 2),
    check('id', 'No es un id valido').isNumeric(),
    validarCampos
], deletePublicacion);



export default router;