const productsRouter = require('../routes/products.router')
const cartsRouter = require('../routes/carts.router')
const listaProdRouter = require('../routes/listaProducts.router')
const messagesRouter = require('../routes/messages.router')
const chatRouter = require('../routes/chat.router')

const router = app =>{
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter); 
    app.use('/', listaProdRouter); 
    app.use('/messages', messagesRouter); 
    app.use('/chat', chatRouter)
}

module.exports = router