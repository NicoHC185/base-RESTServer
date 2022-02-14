const { response } = require("express");

const validarArchivoSubir = (req, res=response, next) =>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg:"No file intteh request"});
        return;
    }
    next()
}

module.exports = {
    validarArchivoSubir
}