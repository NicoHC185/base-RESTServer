const {Router} = require('express')
const { check } = require('express-validator')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { existeProductoPorID, existeCategoria } = require('../helpers/db-validators')
const {
    validarCampos,
    validarJWT,
    esAdminRole
} = require('../middlewares/')
const router = Router()

//Obtener todos los productos - public
router.get('/',obtenerProductos)

//Obtener un producto por id - public
router.get('/:id',[  
    check('id','la id invalida, ingrese una id de mongoDB').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos,
],obtenerProducto)

//Crear una nuevo producto - private, cualquier persona con un token valido
router.post('/',[  
    validarJWT,
    check('nombre','El nombre es necesario').notEmpty(),
    check('categoriaId','La id de la categoria no es valida').isMongoId(),
    check('categoriaId').custom(existeCategoria),
    validarCampos
], crearProducto)

//Actualizar un registro por id - private, cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id','la id invalida, ingrese una id de mongoDB').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto)

//Borrar una categoria por id- private, solo si es admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom(existeProductoPorID),
    check('id','la id invalida, ingrese una id de mongoDB').isMongoId(),
    validarCampos,
], borrarProducto)

module.exports = router