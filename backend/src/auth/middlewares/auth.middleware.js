const jwt=require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    try{

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
            return res.status(403).json({message:"Forbidden"});
        }
        req.user=user;
        next();
    })

    }catch(e){
        res.status(500).json({message:"Internal Server Error"});
    }
   
}
module.exports=authMiddleware
