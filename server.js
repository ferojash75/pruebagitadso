console.clear()

//importar modulos necesarios para implementación
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

//importar los datos Json de los productos
const mibd = require('./public/data/productos.json')
//importar los datos Json de los usuarios
const mibdu = require('./public/data/usuarios.json')

//puerto para la aplicación
const puerto = process.env.PUERTO

//constante para nuestra aplicación
const app = express()

//Middleware
app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'))

app.use(express.json())
app.use(cors())
//app.use(express.text())

//ruta principal que devuelve como respuesta el formulario de post
// app.get('/', (req, resp) =>{
//     let indice = path.join(__dirname, 'public', 'views/index_post.html')
//     resp.sendFile(indice)
// })

//endpoint o ruta de acceso para el login
app.post('/login', (req, resp) =>{
    const credenciales = {
        nombreuser : req.body.nombreus,
        password : req.body.contraus
    }
    const nombreus = credenciales.nombreuser
    const passwordus = credenciales.password
    const rutahtml = '/views/indice.html'
    //por medio del metodo find() realizo la verificacion por usuario de las credenciales
    const usuario = mibdu.find(user => 
        user.nombreusuario === nombreus && user.password === passwordus
    )
    if(usuario){
        resp.json({nombreus, rutahtml})
    }else{
        resp.status(401).json({error: 'Credenciales incorrectas'})
    }
})

//endpoint o ruta para consulta de productos
app.get('/productos', (req, resp) => {
    resp.json(mibd)
})

//ruta o endpoint para post (registro de productos)
app.post('/registro', (req, resp) =>{
    //captura de los valores enviados por el cuerpo de la petición
    let id = parseInt(req.body.id),
        nombre = req.body.nombre,
        descripcion = req.body.descripcion,
        precio = parseFloat(req.body.precio),
        cantidad = parseInt(req.body.cantidad)

    mibd.push({
        id,nombre,descripcion,precio,cantidad
    })

    let datos = JSON.stringify(mibd)

    fs.writeFileSync('./public/data/productos.json', datos)

    resp.send(mibd)
})

//endpoint o ruta para get (consulta de productos)
app.get('/productos/:nombre', (req, resp) =>{
    //capturar el valor que trae la petición
    let nombre = req.params.nombre

    let consulta = mibd.find(producto => producto.nombre === nombre)

    if(consulta){
        resp.json(consulta)
    }else{
        resp.status(404).json( {error: 'Producto no encontrado'} )
    }
})

//endPoint o ruta para el delete de productos
app.delete('/productos/:id', (req, resp) => {
    //capturamos el parametro del id que viene en la peticion
    let id = parseInt(req.params.id)

    const indiceProducto = mibd.findIndex((producto) => producto.id === id)

    if(indiceProducto === -1){
        return resp.status(404).json('Producto no encontrado')
    }else{
        mibd.splice(indiceProducto, 1)
    }

    let datos = JSON.stringify(mibd)
    fs.writeFileSync('./public/data/productos.json', datos)

    return resp.send(mibd)
})


//PARA RUTAS DE NAVEGACION

const rutas = {
    'consultar':'/consulta',
    'registrar':'/registrar',
    'actualizar':'/actualizar',
    'eliminar':'/eliminar'
}

app.post('/rutas', (req, resp) =>{

    let ruta = req.body.ruta
    console.log(ruta)
    if(rutas[ruta]){
        resp.json({
            success: true,
            route: rutas[ruta]
        })
    }else{
        resp.json({
            success: false,
            message: 'Ruta no disponible'
        })
    }

})

app.get('/consulta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index_get.html'));
})
app.get('/registrar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index_post.html'));
})
app.get('/actualizar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index_patch.html'));
})
app.get('/eliminar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index_delete.html'));
})

//FIN DE RUTAS


//implementación del servidor express
app.listen(puerto, () =>{
    console.log(`Listo en el puerto: http://localhost:${puerto}`)
})