import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validar-campos';
import { listarCategorias, postCategoria, putCategoria, deleteCategoria, listarCategoriasAdmin, listarCategoriaId } from '../controllers/categoria.controller';
import { existeCategoria, existeUsuario } from '../helpers/db-validators';
import validarJWT from '../middlewares/validar-jwt';
import { adminRol } from '../middlewares/validar-roles';

const router = Router();

router.get('/', [
    validarJWT
], listarCategorias);

router.get('/admin', [
    validarJWT,
    adminRol,
], listarCategoriasAdmin);

router.get('/:id',[validarJWT], listarCategoriaId);

router.post('/', [
    validarJWT,
    adminRol,
    check('categoria', 'Debe ingresar una categoria').not().isEmpty(),
    check('categoria').custom(existeCategoria),

    validarCampos
], postCategoria);

router.put('/:id',[
    validarJWT,
    adminRol,
    check('categoria', 'Debe ingresar una categoria').not().isEmpty(),
    check('categoria').custom(existeCategoria),
    check('id', 'No es un id valido').isNumeric(),
    validarCampos
], putCategoria);


router.delete('/:id',[
    validarJWT,
    adminRol,
    validarJWT, 
    adminRol,
    check('id', 'No es un id valido').isNumeric(),
    validarCampos
], deleteCategoria);



export default router;