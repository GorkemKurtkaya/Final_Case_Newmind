import { Kafka } from 'kafkajs';
import CreditCard from '../models/creditCardModel.js';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKER],
});
const producer = kafka.producer();


export const addCreditCard = async (req, res) => {
  try {
    const { cardName, cardNumber, expiryDate, cvv } = req.body;
    const card = await processCreditCard({ cardName, cardNumber, expiryDate, cvv });

    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

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
export const sendPaymentSuccessMessage = async ({ orderId, cardName, amount, cardNumber }) => {
  const paymentInfo = { orderId, cardName, amount, cardNumber: cardNumber.slice(-4) }; 

  await producer.connect();
  await producer.send({
    topic: 'payment-success',
    messages: [{ value: JSON.stringify(paymentInfo) }],
  });
  await producer.disconnect();
};
