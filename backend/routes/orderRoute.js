import express from 'express';
import * as orderController from '../controllers/orderController.js';
import * as authMiddleWare from '../middlewares/authmiddleware.js';

const router = express.Router();

// Sipaş Oluşturma
router.post('/',authMiddleWare.authenticateToken, orderController.createOrder);

// Sipariş Güncelleme
router.put('/:id',authMiddleWare.authenticateToken, orderController.updateOrder);

// Sipariş Durumunu Güncelleme
router.put("/status/:id", orderController.updateOrderStatus);

// Sipariş Silme
router.delete('/:id',authMiddleWare.authenticateToken, orderController.deleteOrder);

// Kullanıcının Siparişlerini Getirme
router.get("/find/:userId",authMiddleWare.authenticateToken, orderController.getUserOrders);

// Tüm Siparişleri Getirme
router.get("/",authMiddleWare.authenticateToken, orderController.getAllOrders);

// Sipariş Gelirini Getirme
router.get("/income",authMiddleWare.authenticateToken, orderController.getOrderIncome);

// Sipariş Getirme
router.get("/findorder/:id",authMiddleWare.authenticateToken, orderController.getOrder);




export default router;