const express = require("express")
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../controller/product.controller");
const upload = require("../../middlewares/upload.middleware");

const router = express.Router()

router.post("/create", authMiddleware, upload.single("product_image"), createProduct);
router.get("/get", authMiddleware, getAllProducts);
router.get("/get/:id", authMiddleware, getProduct);
router.put("/update/:id", authMiddleware, upload.single("product_image"), updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);

module.exports=router