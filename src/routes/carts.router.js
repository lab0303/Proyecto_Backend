const { Router } = require('express');
const ProductManager = require('../ProductsManager')
const router = Router();

const carrito = new ProductManager('./src/data/carrito.json')

router.post('/',async (req,res) =>{
  const {productsCart} = req.body
  const item ={
    productsCart
  }
  await carrito.addProduct(item)
  res.json({message:'Carrito creado'})
})

router.get('/', async (req,res)=>{
    const getCart = await carrito.getProduct();
    res.json({carrito: getCart})
})

router.get('/:cid', async (req,res)=>{
    const cid = Number(req.params.cid);
    const getCartId = await carrito.getProductById(cid);
    res.json({carrito: getCartId})
})

router.post('/:cid/product/:pid', async(req,res)=>{
   const cid = Number(req.params.cid)
   const pid = Number(req.params.pid)
   await carrito.addProductCarrito(cid,pid)

    res.json({carrito})
})



module.exports = router;