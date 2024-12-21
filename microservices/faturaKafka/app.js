import express from 'express';
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import Invoice from './models/Invoice.js';  
import conn from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

conn();


const kafka = new Kafka({
  clientId: 'invoice-service',
  brokers:['kafka:9092'],

  // LOCALDE ÇALIŞTIRMAK İÇİN AŞAĞIDAKİ KODU KULLANINIZ
  // brokers:['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'invoice-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-success', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const paymentInfo = JSON.parse(message.value.toString());  // String yerine direkt nesne
      console.log(`Fatura Bilgisi Geldi:`, paymentInfo);  // Nesne olarak yazdır
  
      // Fatura oluştur
      createInvoice(paymentInfo);
    },
  });
};

const createInvoice = async (paymentInfo) => {
  const { orderId, amount, cardName } = paymentInfo;


  const newInvoice = new Invoice({
    orderId,
    amount,
    cardName,
  });

  try {
    await newInvoice.save();  // MongoDB'ye kaydet
    console.log('Fatura Oluşturuldu', newInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
  }
};




app.listen(process.env.PORT, () => {
  console.log(`Invoicing service running on port ${process.env.PORT}`);
  run();
});
