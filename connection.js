//import mongoose
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

//connection
mongoose.connect(connectionString).then(()=>{
    console.log('MongoDB connnected successfully');
    
}).catch((err)=>{
    console.log(`Connection error due to ${err}`);
    
})