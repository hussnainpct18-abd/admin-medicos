const blogModel=require("../model/blog.model");

async function createBlog(req,res){
    try{
        const {title,blog_image,description,long_description}=req.body;
        const blog=await blogModel.create({title,blog_image,description,long_description});
        res.status(200).json({message:"Blog created successfully",blog});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function getAllBlogs(req,res){
    try{
        const blogs=await blogModel.find();
        res.status(200).json({blogs});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function getBlog(req,res){
    try{
        const blog=await blogModel.findById(req.params.id);
        res.status(200).json({blog});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function updateBlog(req,res){
    try{
        const blog=await blogModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:"Blog updated successfully",blog});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function deleteBlog(req,res){
    try{
        const blog=await blogModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Blog deleted successfully",blog});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={createBlog,getAllBlogs,getBlog,updateBlog,deleteBlog}