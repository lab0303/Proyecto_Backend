const mongoose = require('mongoose')

const productCollection = 'product'

const productSchema = new mongoose.Schema({

})

const Products = mongoose.model(productCollection, productSchema)

module.exports = Products