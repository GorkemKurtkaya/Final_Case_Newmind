import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import { checkUser } from "./middlewares/authmiddleware.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import basketRoute from "./routes/basketRoute.js";
import * as redis from "./utils/redis.js";
import logger from "./utils/logger.js";
import { Server } from 'socket.io';
import { createServer } from "http";




// .env dosyasını okuma
dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


//db connection
conn();

//redis bağlantısı
redis.redisCon();


//express
const PORT = process.env.PORT || 3000;
const app = express();

const SOCKET_PORT = 9000; 


// log işlemleri
app.use((req, res, next) => {
  logger.info(`${req.method} - ${req.url} - ${req.ip}`);
  next();
});

//static dosyası
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));



//routes
app.use('*', checkUser);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/product", productRoute);
app.use("/orders", orderRoute);
app.use("/basket", basketRoute);






app.post("/sendMessage", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("Mesaj eksik!");
  }
  io.emit("message", message);
  res.status(200).send("Mesaj gönderildi!");
});


// Socket.IO sunucusu
const ioServer = createServer();
const io = new Server(ioServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on("connection", (socket) => {
  console.log(`Yeni bir kullanıcı bağlandı: ${socket.id}`);


  socket.on("disconnect", () => {
    console.log(`Kullanıcı ayrıldı: ${socket.id}`);
  });

  io.emit("message", "Merhaba yeni kullanıcı!");
});

ioServer.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO Server çalışıyor: http://localhost:${SOCKET_PORT}`);
});


app.listen(PORT, () => {
  console.log(`Express Server Çalışıyor http://localhost:${PORT}`);
});

