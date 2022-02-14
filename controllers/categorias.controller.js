const { response } = require("express");
const { Categoria, Usuario } = require("../models");

//Obtener categorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) =>{
    const { desde=0, limite=5} = req.query
    const query = {estado:true}
    if(isNaN(Number(limite))) return res.status(400).json({msg:'El limite debe de ser un valor numerico'})
    if(isNaN(Number(desde))) return res.status(400).json({msg:'El parametro desde debe de ser un valor numerico'})    
    // let usuario = Usuario
    const [total, categorias] =  await Promise.all([
        Categoria.count(query), 
        Categoria.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario','nombre')
    ])
    res.status(200).json({total, categorias})
} 

//Obtener categoria - populate {}
const obtenerCategoria = async(req, res = response) =>{
    const {id} = req.params
    const categoria = await Categoria.findById(id)
        .populate('usuario','nombre')
    if(!categoria.estado) return res.status(404).json({msg:`La categoria con id ${id} ingresada se encuentra eliminada`})
    
    res.status(200).json({
        categoria
    })
    
} 

//Actualizar categoria - populate
const actualizarCategoria = async (req, res = response) =>{
    const {id} = req.params
    const {estado, usuario, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    try{
        const categoria = await Categoria.findByIdAndUpdate(id,data, {new: true})
        res.json(categoria)
    }catch(error){
        res.status(400).json({msg:"El nombre ya se encuentra registrado en la base de datos, por favor ingresar otro"})
        console.log('eror',error);
    }
}

//Borrar categoria - estado: false
const borrarCategoria = async (req, res = response) => {
    const {id} = req.params
    const categoria  = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    res.status(200).json({msg:"La categoria se ha eliminado correctamente"})
}

//crear categoria
const crearCategoria = async (req, res = response) =>{
    try{
        const nombre = req.body.nombre.toUpperCase()
        const categoriadb = await Categoria.findOne({nombre})
        if(categoriadb){
            return res.status(400).json({msg: `La categoria ${nombre} ya existe`})
        }
    
        //generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }
        const categoria =await new Categoria(data)
        await categoria.save()
        res.status(201).json({
            msg:"Categoria creada con exito"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Error al crear categoria"})
    }
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
}