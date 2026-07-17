const mongoose = require('mongoose');


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Blog title is required']
    },
    blog_image:{
        type:String,
        required:[true,'Blog image is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    long_description:{
        type:String,
        required:[true,'long Description is required']
    }
})

const blogModel=mongoose.model('blog',blogSchema);

module.exports=blogModel;