const {Schema, model} = require("mongoose")

const ProductoSchema = Schema({
    nombre:{
        type: String,
        requried: [true, "El rol es obligatorio"],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        requried: true
    },
    desc: {
        type: String,
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img: {
         type: String
    }
})

ProductoSchema.methods.toJSON = function(){
    const { __v, estado , ...categoria} =  this.toObject()
    return categoria
}

module.exports =  model('Producto', ProductoSchema)