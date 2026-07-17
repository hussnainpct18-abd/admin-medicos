const express = require("express")
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../controller/product.controller");

const router = express.Router()

router.post("/create",authMiddleware,createProduct);
router.get("/get",authMiddleware,getAllProducts);
router.get("/get/:id",authMiddleware,getProduct);
router.put("/update/:id",authMiddleware,updateProduct);
router.delete("/delete/:id",authMiddleware,deleteProduct);

module.exports=router