import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleWare from "../middlewares/authmiddleware.js";
import { checkUser } from "../middlewares/authmiddleware.js";

const router = express.Router();


router.route('/:id').get(userController.getAUser);
router.put("/changeNameandMail",authMiddleWare.authenticateToken,userController.changeNameandMail);




export default router;
