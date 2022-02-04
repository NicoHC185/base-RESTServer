const validarCampos = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')
const validarCategorias = require('./validar-categorias')

module.exports = {
    ...validarCampos,...validarJWT, ...validaRoles, ...validarCategorias
}
