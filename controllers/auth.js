const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { json } = require('express/lib/response')
const { generarJWT } = require('../helpers/generar-JWT')
const { googleVerify } = require('../helpers/google-verify')
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

const googleSingIn = async(req, res = response)=>{

    try{
        const { id_token } = req.body
        const {nombre, img, correo} = await googleVerify(id_token) 
        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            //crear usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol:'USER_ROL'
            }
            usuario = new Usuario(data)
            try{
                await usuario.save()
            }catch(error){
                return res.status(500).json({msg:"Error al crear cuenta con google sign"})
            }
        }

        //si el usuario en db 
        if(!usuario.estado) return res.status(401).json({msg:"Hable con el administrador, usuario bloqueado"})

        //generar jwt
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })   
    }catch(error){
        res.status(400).json({
            msg: 'El token no se pudo verificar'
        })
    }
}

module.exports = {
    loginController,
    googleSingIn
}