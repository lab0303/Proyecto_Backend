const productsRouter = require('../routes/products.router')
const cartsRouter = require('../routes/carts.router')
const listaProdRouter = require('../routes/listaProducts.router')
const router = app =>{
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter); 
    app.use('/', listaProdRouter); 
}

module.exports = router