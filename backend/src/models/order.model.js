import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

    // Products in the order
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productModel",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    // Shipping Address
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    // Payment Method
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Card", "JazzCash", "EasyPaisa"],
      default: "Cash on Delivery",
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Order Status
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // Total Amount
    totalPrice: {
      type: Number,
      required: true,
    },

    // Delivery Charges
    shippingCharges: {
      type: Number,
      default: 0,
    },

    // Tax
    tax: {
      type: Number,
      default: 0,
    },

    // Final Amount
    grandTotal: {
      type: Number,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orderModel", orderSchema);

export default orderModel;