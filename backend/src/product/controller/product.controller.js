const productModel=require("../model/product.model");

async function createProduct(req,res){
    try{
        const {title,product_image,description,category_id,long_description}=req.body;
        const product=await productModel.create({title,product_image,description,category_id,long_description});
        res.status(200).json({message:"Product created successfully",product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function getAllProducts(req,res){
    try{
        const products=await productModel.find();
        res.status(200).json({products});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function getProduct(req,res){
    try{
        const product=await productModel.findById(req.params.id);
        res.status(200).json({product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function updateProduct(req,res){
    try{
        const product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:"Product updated successfully",product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function deleteProduct(req,res){
    try{
        const product=await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Product deleted successfully",product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={createProduct,getAllProducts,getProduct,updateProduct,deleteProduct}