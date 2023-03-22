const {Router} = require('express')
const products = require('../data/products.json')


const route = Router()

route.get('/',(req,res) =>{
    res.render('home',{products})
})

route.get('/realtimeproducts',(req,res) =>{
    res.render('realTimeProducts',{products});
    
})

module.exports = route