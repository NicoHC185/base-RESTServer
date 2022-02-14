const dbValidators = require('./db-validators.helper')
const generarJWT = require('./generar-JWT.helper')
const googleVerify = require('./google-verify.helper')
const upFile = require('./upFile')

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...upFile,
}