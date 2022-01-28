const {response, request} = require('express')

const usuariosGet = (req = request, res = response) =>{
    const {id, name='No name'} = req.query
    res.json({
        msg: 'get api-controlador',
        id, 
        name
    })
}

const usuariosPost = (req, res = response) =>{
    const {nombre, edad} = req.body

    res.status(201).json({
        msg: 'post api-controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) =>{
    const id = req.params.id
    res.json({
        msg: 'put api-controlador',
        id
    })
}

const usuariosPatch = (req, res) =>{
    res.json({
        msg: 'patch api-controlador'
    })
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'delete api-controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}