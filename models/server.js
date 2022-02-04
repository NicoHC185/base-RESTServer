const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../DB/config')

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
    }
    
    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
        this.app.use(this.paths.categorias,require('../routes/categorias'))
        this.app.use(this.paths.productos,require('../routes/productos'))
        this.app.use(this.paths.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }
}

module.exports = Server