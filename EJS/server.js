const express = require('express')
const ProductosApi = require('./api/productos.js')
const { Router } = express

const productosApi = new ProductosApi()
const productosRouter = new Router()
productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/productos', productosRouter)

//Set engine handlebars

app.set('view engine', 'ejs')

// fin setup handlebars
app.use(express.static('public'))

//--------------------------------------------

productosRouter.post('/', (req, res) => {
    productosApi.guardar(req.body);
    res.redirect('/');
});

productosRouter.get('/',(req, res) => {
    const productos = productosApi.listarAll();
    const length = productos.length > 0 ? true : false;
    res.render("main",{productos: productos, length});
});

//--------------------------------------------


app.use('', productosRouter)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))