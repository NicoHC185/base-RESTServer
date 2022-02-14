const {Router} = require('express')
const { check } = require('express-validator')
const { loadFile, mostrarImg, updateImgCloudinary } = require('../controllers/upload.controller')
const { validCollections } = require('../helpers/db-validators.helper')

const {
    validarCampos, validarArchivoSubir,
} = require('../middlewares')

const router = Router()

router.post('/',[
    validarArchivoSubir,
    validarCampos
], loadFile)
router.put('/:collection/:id',[
    check('id','the id most be a mongoID').isMongoId(),
    check('collection').custom( c => validCollections (c, ['usuarios', 'productos']) ),
    validarArchivoSubir,
    validarCampos,
], updateImgCloudinary)

router.get('/:collection/:id',[
    check('id','the id most be a mongoID').isMongoId(),
    check('collection').custom( c => validCollections (c, ['usuarios', 'productos']) ),
    validarCampos
], mostrarImg)


module.exports = router