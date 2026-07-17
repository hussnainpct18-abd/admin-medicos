const express=require("express");
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const router=express.Router();

const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require("../controller/category.controller");

router.post("/create",authMiddleware,createCategory);
router.get("/get",authMiddleware,getAllCategories);
router.get("/get/:id",authMiddleware,getCategory);
router.put("/update/:id",authMiddleware,updateCategory);
router.delete("/delete/:id",authMiddleware,deleteCategory);

module.exports=router