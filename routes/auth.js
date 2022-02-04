const {Router} = require('express')
const { check } = require('express-validator')
const { 
    googleSingIn,
    loginController,
} = require("../controllers/auth")

const { validarCampos, } = require('../middlewares/validar-campos')

const router = Router()

router.post('/login',[
    check('correo','Correo invalido').isEmail(),
    check('password','La contraseña es necesaria').notEmpty(),
    validarCampos
], loginController)

router.post('/google',[
    check('id_token','El ID token de google es necesario').notEmpty(),
    validarCampos
], googleSingIn)

module.exports = router