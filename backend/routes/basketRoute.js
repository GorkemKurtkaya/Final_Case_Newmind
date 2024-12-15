import express from "express";
import basketController from "../controllers/basketController.js";



const router = express.Router();


router.post('/',basketController.addToBasket)
router.get('/:userId',basketController.getBasket)
router.delete('/:userId',basketController.delete)



export default router;


