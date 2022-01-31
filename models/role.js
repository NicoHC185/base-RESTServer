const {Schema, model} = require("mongoose")

const RolSchema = Schema({
    rol:{
        type: String,
        requried: [true, "El rol es obligatorio"]
    }
})

module.exports =  model('Role', RolSchema)