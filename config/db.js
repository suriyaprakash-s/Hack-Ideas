const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://url',
         {useNewUrlParser:true, useUnifiedTopology: true});
        console.log("MongoDB is connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;