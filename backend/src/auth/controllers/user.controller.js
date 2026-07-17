const userModel = require("../../models/user.model");


async function registerUser(req,res){
    try{
        const {name, email, password} = req.body;
        const user= await userModel.create({name, email, password});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);
        res.status(200).json({message:"User registered successfully",token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

async function loginUser(req,res){
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const validPassword = await user.comparePassword(password);
        if(!validPassword){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);
        res.status(200).json({message:"User logged in successfully",token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function logoutUser(req,res){
    try{
        res.clearCookie("token");
        res.status(200).json({message:"User logged out successfully"});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports={registerUser,loginUser,logoutUser};
