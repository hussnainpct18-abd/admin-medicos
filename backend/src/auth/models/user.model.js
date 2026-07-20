const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[false,"User must be unique"],
        required:false
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email must be unique"]
    },
    name: { type: String },
    phone: { type: String },
    role: { type: String, default: 'Admin' },
    status: { type: String, default: 'Active' },
    avatar: { type: String },
    lastLogin: { type: String }
}, { timestamps: true });

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;