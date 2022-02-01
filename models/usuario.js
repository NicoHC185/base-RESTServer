const {Schema, model} = require('mongoose')
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

UsuarioSchema.methods.toJSON = function(){
    const { __v, _id , password, ...usuario} =  this.toObject()
    usuario.uid = _id 
    return usuario
}

module.exports = model('Usuario',UsuarioSchema)