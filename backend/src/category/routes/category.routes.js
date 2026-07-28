const express=require("express");
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const router=express.Router();

const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require("../controller/category.controller");
const upload = require("../../middlewares/upload.middleware");

router.post("/create", authMiddleware, upload.single("category_image"), createCategory);
router.get("/get", authMiddleware, getAllCategories);
router.get("/get/:id", authMiddleware, getCategory);
router.put("/update/:id", authMiddleware, upload.single("category_image"), updateCategory);
router.delete("/delete/:id", authMiddleware, deleteCategory);

module.exports=router