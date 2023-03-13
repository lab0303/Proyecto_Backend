const { Router } = require('express');

const router = Router();

router.get('/', (req,res)=>{
    res.json({message: 'Cart list'})
})

module.exports = router;