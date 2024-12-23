import express from 'express';
import dotenv from 'dotenv';
import paymentController from './controllers/paymentController.js';
import conn from './db.js';
import cors from "cors";

// KAFKA BAĞLANTISI services dosyasındaki paymentService.js dosyasında!!!

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Bağlantısı
conn();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

// Rotayı bağlama
app.use('/payment', paymentController);

const PORT = process.env.PORT || 3500; 

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
