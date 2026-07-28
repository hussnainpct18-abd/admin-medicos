const productModel=require("../model/product.model");

async function createProduct(req,res){
    try{
        const { title, description, long_description, price, discountPrice, quantity, sku, status, brand, unit, category } = req.body;
        let product_image = undefined;
        if (req.file) {
            product_image = `/uploads/${req.file.filename}`;
        }
        const product = await productModel.create({
            title,
            product_image,
            description,
            long_description,
            price,
            discountPrice,
            quantity,
            sku,
            status,
            brand,
            unit,
            categoryName: category
        });
        res.status(201).json({message:"Product created successfully", product});
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
        if (!product) return res.status(404).json({message:"Product not found"});
        res.status(200).json({product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function updateProduct(req,res){
    try{
        let updateData = { ...req.body };
        if (req.body.category) {
            updateData.categoryName = req.body.category;
            delete updateData.category;
        }
        if (req.file) {
            updateData.product_image = `/uploads/${req.file.filename}`;
        }
        const product=await productModel.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if (!product) return res.status(404).json({message:"Product not found"});
        res.status(200).json({message:"Product updated successfully",product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function deleteProduct(req,res){
    try{
        const product=await productModel.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({message:"Product not found"});
        res.status(200).json({message:"Product deleted successfully",product});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={createProduct,getAllProducts,getProduct,updateProduct,deleteProduct}