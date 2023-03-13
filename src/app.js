const express = require('express');
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})