const userModel=require('../../auth/models/user.model');

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
        const {username,password,email}=req.body;
        const user=new userModel({username,password,email});
        await user.save();
        res.status(201).json({message:"User added successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const DeleteUsers=async(req,res)=>{
    try {
        const {username}=req.body;
        await userModel.deleteOne({username});
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const UpdateUsers=async(req,res)=>{
    try {
        const {username,password,email}=req.body;
        await userModel.updateOne({username},{password,email});
        res.status(200).json({message:"User updated successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports={GetUsers,AddUsers,DeleteUsers,UpdateUsers}