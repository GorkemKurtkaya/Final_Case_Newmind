import {
    createProductService,
    updateProductService,
    deleteProductService,
    getAProductService,
    getAllProductsService
} from "../services/productService.js";
import fs from "fs";





export const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.user.role, req.body, req.files.image.tempFilePath);

        fs.unlink(req.files.image.tempFilePath, (err) => {
            if (err) {
                console.error("Temp file silinemedi:", err);
            } else {
                console.log("Temp file başarıyla silindi");
            }
        });
        res.status(201).json({
            succeeded: true,
            Product: product,
            message: "Ürün Başarıyla Oluşturuldu",
        });
        console.log("Ürün oluşturuldu");
    } catch (error) {
        if (req.files?.image?.tempFilePath) {
            fs.unlink(req.files.image.tempFilePath, (err) => {
                if (err) console.error("Hata temp file silinemedi:", err);
            });
        }
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            succeeded: false,
            message: "Product ID is required",
        });
    }

    try {
        const updatedProduct = await updateProductService(req.user.role, req.params.id, req.body);
        res.status(200).json(updatedProduct);
        console.log("Ürün güncellendi");
    } catch (error) {
        const statusCode = error.message === "Product not found or invalid ID" ? 404 : 500;
        res.status(statusCode).json({
            succeeded: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const message = await deleteProductService(req.user.role, req.params.id);
        res.status(200).json({
            succeeded: true,
            message,
        });
        console.log("Ürün silindi");
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
    }
};

export const getAProduct = async (req, res) => {
    try {
        const product = await getAProductService(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const products = await getAllProductsService(req.query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
    }
};
