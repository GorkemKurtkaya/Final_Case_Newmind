import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    image: {
        type: String,
        required: true
    },
    category: {
      type: String,
      required: true
  },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;