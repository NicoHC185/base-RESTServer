const {
    Role,
    Usuario,
    Categoria,
    Producto
} = require('../models')
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
        throw new Error(`Este correo ya se encuentra registrado :(`)
    }
}

const existeUsuarioPorID = async (id) =>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id ${id} no se encuentra registrado`)
    }
}

const existeCategoria = async(id='')=>{
    const categoria = await Categoria.findById(id)
    if(!categoria) throw new Error(`La id ${id} ingresada no se encuentra registrada`)
}

const existeProductoPorID = async(id='')=>{
    const producto = await Producto.findById(id)
    if(!producto) throw new Error(`La id ${id} ingresada no se encuentra registrada`)
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoria,
    existeProductoPorID
}