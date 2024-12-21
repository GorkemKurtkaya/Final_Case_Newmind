import express from 'express';
import * as productController from '../controllers/productController.js';
import * as authMiddleWare from '../middlewares/authmiddleware.js';

const router = express.Router();

// Ürün Oluşturma
router.post('/',authMiddleWare.authenticateToken, productController.createProduct);

// Ürün Güncelleme
router.put('/:id',authMiddleWare.authenticateToken, productController.updateProduct);

// Ürün Silme
router.delete('/:id',authMiddleWare.authenticateToken, productController.deleteProduct);

// Ürün Getirme
router.get('/find/:id', productController.getAProduct);

// Tüm Ürünleri Getirme
router.get('/', productController.getAllProduct);

// ElasticSearch ile Ürün Arama
router.get('/search/:text', productController.searchProduct);



export default router;