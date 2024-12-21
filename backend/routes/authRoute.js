import express from "express";
import * as authController from "../controllers/authController.js";
import * as authMiddleWare from "../middlewares/authmiddleware.js";
import { checkUser } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post('/login', authController.loginUser);

// Kullanıcıyı kontrol et
router.get("/checkUser", checkUser, (req, res) => {
  if (res.locals.user) {
    res.status(200).json({ user: res.locals.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Kullanıcıyı kontrol et
router.get("/auth", authMiddleWare.authenticateToken, (req, res) => {
  if(res.locals.user){
    res.status(200).send("Authenticated");
  }else{
    res.status(401).send("Unauthorized");
  }

});

// Çerez oluştur
router.get("/cook", (req, res) => {
  const cookie = req.cookies["jwt"];

  // Eğer çerez varsa, gönder
  if (cookie) {
    res.send({ cookie });
  } else {
    res.status(404).send("Cookie not found");
  }
});

router.get("/logout", authController.getLogout);








export default router;
