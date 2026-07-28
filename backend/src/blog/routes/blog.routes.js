const express=require("express");
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const router=express.Router();
const upload = require("../../middlewares/upload.middleware");

const { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require("../controller/blog.controller");

router.post("/create", authMiddleware, upload.single("blog_image"), createBlog);
router.get("/get", authMiddleware, getAllBlogs);
router.get("/get/:id", authMiddleware, getBlog);
router.put("/update/:id", authMiddleware, upload.single("blog_image"), updateBlog);
router.delete("/delete/:id", authMiddleware, deleteBlog);

module.exports=router