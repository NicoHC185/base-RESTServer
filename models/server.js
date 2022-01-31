const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../DB/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
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
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Escuchando en el puerto ${this.port}`))
    }
}

module.exports = Server