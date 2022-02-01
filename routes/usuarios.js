const {Router} =require('express')
const { check, body } = require('express-validator')
const router = Router()

// const {validarCampos} = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
}=require('../middlewares')


const {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
} = require('../helpers/db-validators')

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios')

router.get('/',[
    validarCampos
],usuariosGet)

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength(6),
    // check('rol','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('rol').custom(esRolValido),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPost)

router.put('/:id',[
    check('id','No es un id de mongo valida').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut)

router.patch('/',[
    
], usuariosPatch)

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE',"VENTAS_ROLE"),
    check('id','No es un id de mongo valida').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos,
], usuariosDelete)


module.exports = router