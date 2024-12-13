import express from "express";
import basketController from "../controllers/basketController.js";



const router = express.Router();


router.post('/',basketController.create)


export default router;


