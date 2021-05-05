const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://General:zTabnplymkoqcYto@network-app.r8bep.mongodb.net/HackIdeas?retryWrites=true&w=majority',
         {useNewUrlParser:true, useUnifiedTopology: true});
        console.log("MongoDB is connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;