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
        required:[false,'Description is required']
    },
    category_id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:[false,'category id is required'],
        ref:'categoryModel'
    },
    categoryName:{
        type:String,
        required: false
    },
    long_description:{
        type:String,
        required:[false,'description is required']
    },
    price: { type: Number },
    discountPrice: { type: Number },
    quantity: { type: Number },
    sku: { type: String },
    status: { type: String, default: 'Active' },
    brand: { type: String },
    unit: { type: String }
}, { timestamps: true });

const productModel=mongoose.model('product',productSchema);

module.exports=productModel;