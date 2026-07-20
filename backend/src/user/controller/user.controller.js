const userModel=require('../../auth/models/user.model');
const bcrypt = require("bcryptjs");

const GetUsers=async(req,res)=>{
    try {
        const users=await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const AddUsers=async(req,res)=>{
    try {
        const {username,password,email,name,phone,role,status,avatar}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=new userModel({username,password: hashedPassword,email,name,phone,role,status,avatar});
        await user.save();
        res.status(201).json({message:"User added successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const DeleteUsers=async(req,res)=>{
    try {
        // Fallback to username for backward compatibility, but allow ID
        const id = req.params.id || req.body.id;
        const username = req.body.username;
        if (id) {
            await userModel.findByIdAndDelete(id);
        } else {
            await userModel.deleteOne({username});
        }
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const UpdateUsers=async(req,res)=>{
    try {
        const {username,password,email,name,phone,role,status,avatar}=req.body;
        let updateData = {email,name,phone,role,status,avatar};
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        await userModel.updateOne({username}, updateData);
        res.status(200).json({message:"User updated successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports={GetUsers,AddUsers,DeleteUsers,UpdateUsers}