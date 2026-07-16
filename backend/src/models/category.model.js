const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'category title is required']
    },
    category_image:{
        type:String,
        required:[true,'image is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    }
});

const categoryModel=mongoose.model('category','categorySchema');

module.exports=categoryModel;

