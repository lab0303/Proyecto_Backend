const { Router } = require('express');
const CartManager = require('../CartManager')
const router = Router();

const carrito = new CartManager('./src/data/carrito.json')

router.post('/',async (req,res) =>{
  const {product} = req.body
  const item ={
    product
  }
  await carrito.addProduct(item)
})

router.get('/:cid', async (req,res)=>{
    const cid = Number(req.params.pid);
    const getCartId = await products.getProductById(cid);
    res.json({carrito: getCartId})
})

router.post('/:cid/product/:pid'), async(req,res)=>{
    const {cid, pid} = req.params

}

module.exports = router;