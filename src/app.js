const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');
const {Server} = require('socket.io');
const products = require('./data/products.json');


const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

const httpServer = app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})

let listaProd = [...products]
const io = new Server(httpServer)
io.on('connection', socket =>{
    socket.emit('productos', listaProd)
    socket.on('nuevoProducto', item =>{
        listaProd.push(item)
        io.emit('productos', listaProd)
    })
    socket.on('eliminarProducto', id =>{
        listaProd = listaProd.filter(prod=> prod.id!==id)
        io.emit('productos', listaProd)
    })
})