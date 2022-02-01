const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { generarJWT } = require('../helpers/generar-JWT')
const Usuario = require('../models/usuario')

const loginController = async(req, res = response ) => {
    
    try{
        const { correo, password } = req.body
        const usuario = await Usuario.findOne({correo})
        //verificar si el email o correo existe
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - correo"
            })
        }
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - estado:false"
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - password"
            })
        }
        //generar un json web token (JWT)
         const token = await generarJWT(usuario.id)
    
        res.status(200).json({
            usuario,
            token,
            msg:'Done'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
}

module.exports = {
    loginController,
}