import express from 'express';
import * as orderController from '../controllers/orderController.js';
import * as authMiddleWare from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/',authMiddleWare.authenticateToken, orderController.createOrder);
router.put('/:id',authMiddleWare.authenticateToken, orderController.updateOrder);
router.delete('/:id',authMiddleWare.authenticateToken, orderController.deleteOrder);
router.get("/find/:userId",authMiddleWare.authenticateToken, orderController.getUserOrders);
router.get("/",authMiddleWare.authenticateToken, orderController.getAllOrders);
router.get("/income",authMiddleWare.authenticateToken, orderController.getOrderIncome);
router.get("/findorder/:id",authMiddleWare.authenticateToken, orderController.getOrder);



export default router;