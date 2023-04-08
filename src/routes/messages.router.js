const { Router } = require('express')
const Messages = require('../dao/models/Messages.models')

const router = Router()

router.get('/', async (req, res) => {
    const mensajes = await Messages.find()
    res.json({message: mensajes})
})

router.post('/', async (req, res) => {
    try {
        const {user, message} = req.body
        const newMessageInfo={
            user,
            message
        }
        const mensaje = await Messages.create(newMessageInfo)
        res.json({message:mensaje})
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router