const {Router} = require('express')
const { check } = require('express-validator')
const { googleSingIn } = require("../controllers/auth")
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.post('/google',[
    check('id_token','El ID token de google es necesario').notEmpty(),
    validarCampos
], googleSingIn)

module.exports = router