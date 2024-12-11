import express from 'express';
import * as productController from '../controllers/productController.js';
import * as authMiddleWare from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.post('/',authMiddleWare.authenticateToken, productController.createProduct);
router.put('/:id',authMiddleWare.authenticateToken, productController.updateProduct);
router.delete('/:id',authMiddleWare.authenticateToken, productController.deleteProduct);
router.get('/find/:id',authMiddleWare.authenticateToken, productController.getAProduct);
router.get('/', productController.getAllProduct);



export default router;