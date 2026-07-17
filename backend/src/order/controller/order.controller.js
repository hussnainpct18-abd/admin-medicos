const orderModel=require("../model/order.model");

async function createOrder(req,res){
    try{
        const {user,items,shippingAddress,paymentMethod,paymentStatus,orderStatus,totalPrice,shippingCharges,tax,grandTotal}=req.body;
        const order=await orderModel.create({user,items,shippingAddress,paymentMethod,paymentStatus,orderStatus,totalPrice,shippingCharges,tax,grandTotal});
        res.status(200).json({message:"Order created successfully",order});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function getAllOrders(req,res){
    try{
        const orders=await orderModel.find();
        res.status(200).json({orders});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function getOrder(req,res){
    try{
        const order=await orderModel.findById(req.params.id);
        res.status(200).json({order});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function updateOrder(req,res){
    try{
        const order=await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:"Order updated successfully",order});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

async function deleteOrder(req,res){
    try{
        const order=await orderModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Order deleted successfully",order});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={createOrder,getAllOrders,getOrder,updateOrder,deleteOrder}