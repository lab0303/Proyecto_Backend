const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');
const {Server} = require('socket.io');

const products = require('./data/products.json');
const ProductManager = require('./dao/FileSystem/ProductsManager');
const dbConnect = require('../db');

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

dbConnect()


const httpServer = app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})

const listaProd = new ProductManager('./src/data/products.json')
listaProd.products = [...products]
const io = new Server(httpServer)
io.on('connection', socket =>{
    socket.emit('productos', listaProd.products)

    socket.on('nuevoProducto', item =>{
        listaProd.addProduct(item)
        io.emit('productos', listaProd.products)
    })
    
    socket.on('eliminarProducto', id =>{
        listaProd.deleteProduct(id)
        io.emit('productos', listaProd.products)
    })
})