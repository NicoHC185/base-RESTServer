const { response } = require("express");
const { Producto, Usuario, Categoria } = require("../models");

//Obtener categorias - paginado - total - populate
const obtenerProductos = async(req, res = response) =>{
    const { desde=0, limite=5} = req.query
    const query = {estado:true}
    if(isNaN(Number(limite))) return res.status(400).json({msg:'El limite debe de ser un valor numerico'})
    if(isNaN(Number(desde))) return res.status(400).json({msg:'El parametro desde debe de ser un valor numerico'})    
    const [total, categorias] =  await Promise.all([
        Producto.count(query), 
        Producto.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario','nombre')
            .populate('categoria','nombre')
    ])
    res.status(200).json({total, categorias})
} 

//Obtener categoria - populate {}
const obtenerProducto = async(req, res = response) =>{
    const {id} = req.params
    const producto = await Producto.findById(id)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
    if(!producto.estado) return res.status(404).json({msg:`El producto con id ${id} se encuentra eliminado`})
    res.status(200).json({
        producto
    })
    
} 

//Actualizar categoria - populate
const actualizarProducto = async (req, res = response) =>{
    const {id} = req.params
    const {estado, usuario, categoria, ...data} = req.body
    if(data.nombre) data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    try{
        const producto = await Producto.findByIdAndUpdate(id,data, {new: true})
            .populate('usuario','nombre')
            .populate('categoria','nombre')
        res.json(producto)
    }catch(error){
        res.status(400).json({msg:"El nombre del producto ya se encuentra registrado"})
        console.log('eror',error);
    }
}

//Borrar producto - estado: false
const borrarProducto = async (req, res = response) => {
    const {id} = req.params
    await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    res.status(200).json({msg:"La categoria se ha eliminado correctamente"})
}

//crear categoria
const crearProducto = async (req, res = response) =>{
    try{
        const nombre = req.body.nombre.toUpperCase()
        const productodb = await Producto.findOne({nombre})
        if(productodb){
            return res.status(400).json({msg: `El producto ${nombre} ya existe`})
        }
    
        //generar la data a guardar
        const {precio,  categoriaId, desc} = req.body
        const categoria = await Categoria.findById(categoriaId)
        const data = {
            nombre,
            usuario: req.usuario._id,
            precio,
            categoria: categoria._id,
            desc
        }
        const producto =await new Producto(data)
        await producto.save()
        res.status(201).json({
            msg:"Producto creado con exito"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Error al crear producto"})
    }
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
}