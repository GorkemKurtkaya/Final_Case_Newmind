import express from "express";
import basketController from "../controllers/basketController.js";



const router = express.Router();


// Sepete Ekleme
router.post('/',basketController.addToBasket)
// Sepeti Getirme
router.get('/:userId',basketController.getBasket)
// Sepeti Silme
router.delete('/:userId',basketController.delete)
// Sepet Ürün Güncelleme
router.post('/update',basketController.updateCartItem)


export default router;


