const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Product title is required']
    },
    product_image:{
        type:String,
        required:[true,'Product image is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    category_id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:[true,'category id is required'],
        ref:'categoryModel'
    }
});

const productModel=mongoose.model('product','productSchema');

module.exports=productModel;