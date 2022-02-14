const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../DB/config.mongoDB')
const fileUpload = require('express-fileupload')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        // this.usuariosPath = '/api/usuarios'
        // this.authPath = '/api/auth/'
        
        this.paths = {
            usuariosPath :'/api/usuarios',
            buscar: '/api/buscar',
            authPath :'/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            upLoads: '/api/uploads',
        }

        //Conectar a base de datos
        this.conectarDB()
        //Middlewwares
        this.middlewares()

        //Rutas de la aplicacion
        this.routes()
    }
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //Cors <- es importante para controlar quien tiene acceso al servidor
        this.app.use(cors())
        //Lectura y parseo del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))

        //manejar la carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));
    }
    
    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth.routes'))
        this.app.use(this.paths.buscar,require('../routes/buscar.routes'))
        this.app.use(this.paths.categorias,require('../routes/categorias.routes'))
        this.app.use(this.paths.productos,require('../routes/productos.routes'))
        this.app.use(this.paths.upLoads,require('../routes/uploads.routes'))
        this.app.use(this.paths.usuariosPath,require('../routes/usuarios.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }
}

module.exports = Server