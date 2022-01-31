const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario') 

const usuariosGet = async(req = request, res = response) =>{
    const { limite = 5, desde = 0} = req.query

    const query = {estado: true}

    if(isNaN(Number(limite))) return res.status(400).json({msg:'El limite debe de ser un valor numerico'})
    if(isNaN(Number(desde))) return res.status(400).json({msg:'El parametro desde debe de ser un valor numerico'})

    const [total, usuarios] =  await Promise.all([
        Usuario.count(query), 
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ])


    res.json({
        total,
        usuarios,
    })
}

const usuariosPost = async (req, res = response) =>{
    const {nombre, correo, password, rol}= req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    
    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en BD
    await usuario.save()
    res.status(201).json({
        usuario
    })
}

const usuariosPut = async (req, res = response) =>{
    const {id} = req.params
    const {_id, password, google, ...resto} = req.body
    //todo valiudar contra base de datos
    if(password){
        //encriptar la contrasena
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    // usuario.save()
    res.json(usuario)
}

const usuariosPatch = (req, res) =>{
    res.json({
        msg: 'patch api-controlador'
    })
}

const usuariosDelete = async (req, res = response) =>{
    const {id} = req.params

    //borrar un usuario fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})

    res.json({
        msg: 'delete api-controlador',
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}