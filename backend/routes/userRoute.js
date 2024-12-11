import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleWare from "../middlewares/authmiddleware.js";
import { checkUser } from "../middlewares/authmiddleware.js";

const router = express.Router();


router.route('/:id').get(userController.getAUser);
router.post("/changePassword", authMiddleWare.authenticateToken, userController.changePassword);
router.put("/changeName",authMiddleWare.authenticateToken,userController.changeName);
// router.get("/stats",authMiddleWare.authenticateToken,userController.getUserStats);




export default router;
