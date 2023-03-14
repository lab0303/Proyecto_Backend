const { Router } = require('express');
const ProductManager = require('../ProductsManager')

const products = new ProductManager('./Products.json')
const router = Router();

router.get('/', async (req,res)=>{
    const {limit} = req.query;
    const allProducts = await products.getProduct()
    if(!limit){
       return res.json({products: allProducts})
    }
    if(limit > allProducts.length){
        return res.json({message: 'no existe esa cantidad de productos'})
    } 

    const newProd = []
    for(let i = 0; i < limit; i++){
        newProd[i]= allProducts[i]
    }
        res.json({ products: newProd })
    
})

router.get('/:pid', async (req, res)=>{
    const pid = Number(req.params.pid);
    const getProductId = await products.getProductById(pid);
    res.json({product: getProductId})
})

router.post('/', async (req,res)=>{
    const {nombre} = req.body
    const item = {
        nombre
    }
    await products.addProduct(item)
    res.json({message: 'Producto creado'})
})

router.put('/:pid', async (req,res)=>{
    const pid = Number(req.params.pid);
    const {nombre} = req.body;
    const item = {
        id: pid,
        nombre
    }
    await products.updateProduct(pid,item)
    res.json({message: 'Producto actualizado'})
})

router.delete('/:pid', async (req,res)=>{
    const pid = Number(req.params.pid);
    await products.deleteProduct(pid)
    res.json({message: 'Producto eliminado'})
})



module.exports = router;