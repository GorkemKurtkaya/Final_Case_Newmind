import express from 'express';
import { processCreditCard, sendPaymentSuccessMessage } from '../services/paymentService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { orderId, amount, cardName, cardNumber, expiryDate, cvv } = req.body;

  if (!orderId || !amount || !cardName || !cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ message: 'Missing payment details' });
  }

  try {
    const card = await processCreditCard({ cardName, cardNumber, expiryDate, cvv });

    // Kafka'ya ödeme başarı mesajı gönder
    await sendPaymentSuccessMessage({ orderId, amount, cardNumber: card.cardNumber });

    res.json({ message: 'Ödeme Başarılı', paymentInfo: { orderId, amount,cardName, cardNumber: card.cardNumber.slice(-4) } });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

export default router;
