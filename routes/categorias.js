const {Router} = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria} = require('../controllers/categorias')
const { existeCategoria } = require('../helpers/db-validators')
const {
    validarCampos,
    validarJWT,
    esAdminRole
} = require('../middlewares/')
const { Categoria } = require('../models')
const router = Router()

//Obtener todas las categorias - public
router.get('/',obtenerCategorias)

//Obtener una categorias por id - public
router.get('/:id',[
    check('id','La id es necesaria').notEmpty(),
    check('id','La id es invalida').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria)

//Crear una nueva categoria - private, cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

//Actualizar un registro por id - private, cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria)

//Borrar una categoria por id- private, solo si es admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria)

module.exports = router