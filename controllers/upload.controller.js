const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const {response}= require('express');
const { upFile } = require('../helpers/upFile');
const { Usuario, Producto}= require('../models/index')

const loadFile = async (req, res=response)=>{
    try{
        const nameFile = await upFile(req.files,['txt','md'],'txts')
        res.json({path:nameFile})
    }catch(err){
        res.status(400).json({msg:err})
    }
}

const updateImg = async (req, res= response) =>{
    const {id, collection} = req.params
    let model
    switch (collection) {
        case 'usuarios':
            model = await Usuario.findById(id)
            if(!model) return res.status(400).json({msg:`User not existe user with the id ${id}`})
            break;
        case 'productos':
            model = await Producto.findById(id)
            if(!model) return res.status(400).json({msg:`User not existe a product with the id ${id}`})
            break

        default:
            return res.status(500).json({msg:"Se me olvidó validar esta"})
    }

    //limpiar imagenes previas
    if(model.img) {
        //borrar la img del servidor
        const pathImg = path.join(__dirname, '../uploads/', collection, model.img)
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg)
        }
    }

    const nameFile = await upFile(req.files,['txt','md', 'png'], collection)
    model.img = nameFile
    await model.save()
    return res.json({model})   
}


const updateImgCloudinary = async (req, res= response) =>{
    const {id, collection} = req.params
    let model
        switch (collection) {
            case 'usuarios':
                model = await Usuario.findById(id)
                if(!model) return res.status(400).json({msg:`User not existe user with the id ${id}`})
                break;
            case 'productos':
                model = await Producto.findById(id)
                if(!model) return res.status(400).json({msg:`User not existe a product with the id ${id}`})
                break
    
            default:
                return res.status(500).json({msg:"Se me olvidó validar esta"})
        }
    
    //limpiar imagenes previas
    if(model.img) {
        // TODO: borrar imagenes antiguias
        const nombreArr = model.img.split('/')
        const nombre = nombreArr[nombreArr.length - 1]
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id)
    }
    const {tempFilePath} = req.files.file
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    model.img = secure_url
    await model.save()
    return res.json({model})   
}


const mostrarImg = async (req, res = response) =>{
    const {id, collection} = req.params
    let model
    const pathNoImg = path.join(__dirname, '../assets/no_image.jpg')
    switch (collection) {
        case 'usuarios':
            model = await Usuario.findById(id)
            if(!model) return res.status(200).sendFile(pathNoImg)
            break;
        case 'productos':
            model = await Producto.findById(id)
            if(!model) return res.status(200).sendFile(pathNoImg)
            break

        default:
            return res.status(500).json({msg:"Se me olvidó validar esta"})
    }

    //limpiar imagenes previas
    if(model.img) {
        //borrar la img del servidor
        const pathImg = path.join(__dirname, '../uploads/', collection, model.img)
        if(fs.existsSync(pathImg)){
            return res.sendFile(pathImg)
        }
    }
    res.sendFile(pathNoImg)
}

module.exports = {
    loadFile,
    updateImg,
    mostrarImg,
    updateImgCloudinary
}