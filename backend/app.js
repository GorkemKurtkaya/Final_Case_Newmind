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



// import methodOverride from 'method-override';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


//db connection
conn();

//redis bağlantısı
redis.redisCon();



const PORT = process.env.PORT || 3000;
const app = express();




//static dosyası
app.use(cors({
  origin: "http://localhost:5173", // frontend URL'ini buraya koy
  credentials: true, // cookie'lerin frontend ile paylaşılmasına izin ver
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
// app.use(methodOverride('_method', {
//     methods: ['POST', 'GET']
// }));


//routes
app.use('*', checkUser);
app.use("/auth", authRoute); // /auth/register, /auth/login
app.use("/users", userRoute);
app.use("/product", productRoute);
app.use("/orders", orderRoute);
app.use("/basket", basketRoute);
// app.use("/cart", cartRoute);





app.listen(PORT, () => {
  console.log(`Server Çalışıyor http://localhost:${PORT}`);
});
