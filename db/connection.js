const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected!");
    } catch (error) {
        console.log("DB connection Error!", error);
    }
}
module.exports = connectDB;