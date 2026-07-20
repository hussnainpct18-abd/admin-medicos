const mongoose = require('mongoose');


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Blog title is required']
    },
    blog_image:{
        type:String,
        required:[false,'Blog image is required']
    },
    description:{
        type:String,
        required:[false,'Description is required']
    },
    long_description:{
        type:String,
        required:[false,'long Description is required']
    },
    slug: { type: String },
    author: { type: String, default: 'Admin' },
    publishDate: { type: String },
    status: { type: String, default: 'Draft' },
    metaTitle: { type: String },
    metaDescription: { type: String }
}, { timestamps: true });

const blogModel=mongoose.model('blog',blogSchema);

module.exports=blogModel;