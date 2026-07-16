const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User must be unique"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email must be unique"]
    }
})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;