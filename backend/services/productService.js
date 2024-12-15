import { v2 as cloudinary } from 'cloudinary';

import Product from "../models/productmodel.js";

export const createProductService = async (userRole, productData, imageFilePath) => {
    if (userRole !== "admin") {
        throw new Error("Access denied");
    }

    const result = await cloudinary.uploader.upload(imageFilePath, {
        use_filename: true,
        folder: "Newmind_Products",
    });

    if (!productData.title || !productData.desc || !productData.category || !productData.price || !imageFilePath || !productData.stock) {
        throw new Error("All fields are required");
    }

    const product = await Product.create({
        title: productData.title,
        desc: productData.desc,
        category: productData.category,
        stock: productData.stock,
        price: productData.price,
        imageUri: result.secure_url
    });

    
    return product;
    
};

export const updateProductService = async (userRole, productId, productData) => {
    if (userRole !== "admin") {
        throw new Error("Access denied");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: productData },
        { new: true }
    );

    if (!updatedProduct) {
        throw new Error("Product not found or invalid ID");
    }

    return updatedProduct;
};

export const deleteProductService = async (userRole, productId) => {
    if (userRole !== "admin") {
        throw new Error("Access denied");
    }

    await Product.findByIdAndDelete(productId);
    return "Product has been deleted...";
};

export const getAProductService = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const getAllProductsService = async (query) => {
    const { new: qNew, category: qCategory } = query;
    let products;

    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
    } else {
        products = await Product.find();
    }

    return products;
};