const express=require("express");
const authMiddleware = require("../../auth/middlewares/auth.middleware");
const router=express.Router();

const { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder } = require("../controller/order.controller");

router.post("/create",authMiddleware,createOrder);
router.get("/get",authMiddleware,getAllOrders);
router.get("/get/:id",authMiddleware,getOrder);
router.put("/update/:id",authMiddleware,updateOrder);
router.delete("/delete/:id",authMiddleware,deleteOrder);

module.exports=router