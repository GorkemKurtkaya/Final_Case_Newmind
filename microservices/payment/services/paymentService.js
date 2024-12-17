import { Kafka } from 'kafkajs';
import CreditCard from '../models/creditCardModel.js';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKER],
});
const producer = kafka.producer();

/**
 * Kredi Kartı Doğrulama veya Ekleme
 */
export const processCreditCard = async ({ cardName, cardNumber, expiryDate, cvv }) => {
  let card = await CreditCard.findOne({ cardNumber });

  if (!card) {
    // Kart yoksa ekle
    card = new CreditCard({ cardName, cardNumber, expiryDate, cvv });
    await card.save();
  } else {
    // Kart bilgilerini doğrula
    if (card.cvv !== cvv || card.expiryDate !== expiryDate) {
      throw new Error('Invalid credit card details');
    }
  }

  return card;
};

/**
 * Kafka'ya Ödeme Bilgisi Gönderme
 */
export const sendPaymentSuccessMessage = async ({ orderId, amount, cardNumber }) => {
  const paymentInfo = { orderId, amount, cardNumber: cardNumber.slice(-4) }; // Sadece son 4 hane

  await producer.connect();
  await producer.send({
    topic: 'payment-success',
    messages: [{ value: JSON.stringify(paymentInfo) }],
  });
  await producer.disconnect();
};
