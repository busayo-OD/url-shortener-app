const mongoose = require('mongoose');
require('dotenv').config();

// connect to mongodb
const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;
