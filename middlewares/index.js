const validarCampos = require('./validar-campos')
const validarJWT = require('./validar-jwt')
const validaRoles = require('./validar-roles')
const validarCategorias = require('./validar-categorias')
const validarArchivo = require('./validar-archivo')

module.exports = {
    ...validarCampos,...validarJWT, ...validaRoles, ...validarCategorias,
    ...validarArchivo
}
