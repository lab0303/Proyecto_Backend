const mongoose = require('mongoose')

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({

})

const Carts = mongoose.model(cartCollection, cartSchema)

module.exports = Carts