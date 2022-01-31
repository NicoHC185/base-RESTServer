const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol='') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no se encuentra registrado en la BD`)
    }
}

const emailExiste = async(correo = '')=>{
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`Este correo ya se encuentra registrado.`)
    }
}

const existeUsuarioPorID = async (id) =>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id ${id} no se encuentra registrado`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
}