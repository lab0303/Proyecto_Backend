const mongoose = require('mongoose')
const{dbUsername, dbPassword} = require('../src/config/db.config')

const dbConnect = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.pqdbvwm.mongodb.net/ecommerce?retryWrites=true&w=majority`)
        console.log('db is connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect