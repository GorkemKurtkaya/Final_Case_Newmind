import express from 'express';
import * as productController from '../controllers/productController.js';
import * as authMiddleWare from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/',authMiddleWare.authenticateToken, productController.createProduct);
router.put('/:id',authMiddleWare.authenticateToken, productController.updateProduct);
router.delete('/:id',authMiddleWare.authenticateToken, productController.deleteProduct);
router.get('/find/:id', productController.getAProduct);
router.get('/', productController.getAllProduct);

router.get('/search/:text', productController.searchProduct);



export default router;