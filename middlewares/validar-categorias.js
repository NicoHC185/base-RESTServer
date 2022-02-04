const { response } = require("express")
const { Categoria } = require("../models")


const existeCategoria = async(req, res = response, next)=>{
    const {id} = req.params
    try{
        const categoria = await Categoria.findById(id)
        next()
    }catch(err){
        return res.status(404).json({msg:`La id ${id} ingresada no se encuentra registrada`})
    }
    
}

module.exports = {
    existeCategoria
}