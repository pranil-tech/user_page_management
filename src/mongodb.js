const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginPage")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("mongodb Not connected");
})

const logInSchema = new mongoose.Schema({
    email:{
        type : String,
        required:true
    },
    password:{
        type: String, 
        required: true
    }
})

const collection = new mongoose.model("collection1", logInSchema)

module.exports = collection