const mongoose = require('mongoose');
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


console.log(process.env.MONGO_URI)
const connectDB = async() => {
 const conn = await mongoose.connect('mongodb://localhost:27017/mgmt_db')
 console.log(`MongoDB Connected`. cyan.underline.bold);
}


module.exports = connectDB;