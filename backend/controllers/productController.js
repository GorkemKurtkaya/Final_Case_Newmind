import {
    createProductService,
    updateProductService,
    deleteProductService,
    getAProductService,
    getAllProductsService
} from "../services/productService.js";
import fs from "fs";
import logger from "../utils/logger.js";
import { searchProducts, addProduct,elasticdeleteProduct } from "../utils/elasticsearch.js";





export const createProduct = async (req, res) => {
    try {
        logger.info("Ürün Oluşturma İşlemi");
        const product = await createProductService(req.user.role, req.body, req.files.image.tempFilePath);
        await addProduct(req.body);

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
        logger.info("Ürün Oluşturuldu");
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
        logger.error("Ürün Oluşturulurken Hata Oluştu:", error);
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
        logger.info("Ürün Güncelleme İşlemi");
        const updatedProduct = await updateProductService(req.user.role, req.params.id, req.body);
        res.status(200).json(updatedProduct);
        console.log("Ürün güncellendi");
        logger.info("Ürün Güncellendi");
    } catch (error) {
        const statusCode = error.message === "Product not found or invalid ID" ? 404 : 500;
        res.status(statusCode).json({
            succeeded: false,
            message: error.message,
        });
        logger.error("Ürün Güncellenirken Hata Oluştu:", error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        logger.info("Ürün Silme İşlemi");
        const message = await deleteProductService(req.user.role, req.params.id);
        res.status(200).json({
            succeeded: true,
            message,
        });
        await elasticdeleteProduct(req.params.id);

        console.log("Ürün silindi");
        logger.info("Ürün Silindi");
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
        logger.error("Ürün Silinirken Hata Oluştu:", error);
    }
};

export const getAProduct = async (req, res) => {
    try {
        logger.info("Ürün Getirme İşlemi");
        const product = await getAProductService(req.params.id);
        res.status(200).json(product);
        console.log("Ürün getirildi");
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
        logger.error("Ürün Getirilirken Hata Oluştu:", error);
    }
};

export const getAllProduct = async (req, res) => {
    try {
        logger.info("Tüm Ürünleri Getirme İşlemi");
        const products = await getAllProductsService(req.query);
        res.status(200).json(products);
        console.log("Tüm ürünler getirildi");
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
        logger.error("Tüm Ürünler Getirilirken Hata Oluştu:", error);
    }
};


export const searchProduct = async (req, res) => {
    const { text } = req.params;
    try {
        logger.info("Ürün Arama İşlemi");
        const products = await searchProducts(text);
        res.status(200).json(products);
        console.log("Ürün arandı");
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message,
        });
        logger.error("Ürün Aranırken Hata Oluştu:", error);
    }
}
