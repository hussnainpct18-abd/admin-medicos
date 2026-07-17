const express=require("express");
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const router=express.Router();

const { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require("../controller/blog.controller");

router.post("/create",authMiddleware,createBlog);
router.get("/get",authMiddleware,getAllBlogs);
router.get("/get/:id",authMiddleware,getBlog);
router.put("/update/:id",authMiddleware,updateBlog);
router.delete("/delete/:id",authMiddleware,deleteBlog);

module.exports=router