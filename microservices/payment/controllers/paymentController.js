import express from 'express';
import { processCreditCard, sendPaymentSuccessMessage,addCreditCard } from '../services/paymentService.js';
import CreditCard from '../models/creditCardModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { orderId, amount, cardName, cardNumber, expiryDate, cvv } = req.body;

    if (!orderId || !amount || !cardName || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ message: 'Eksik ödeme bilgileri' });
    }

    const card = await CreditCard.findOne({ cardNumber });

    if (!card) {
      return res.status(404).json({ message: 'Kart bulunamadı, ödeme yapılamaz' });
    }

    if (card.cvv !== cvv || card.expiryDate !== expiryDate) {
      return res.status(400).json({ message: 'Geçersiz kredi kartı bilgileri' });
    }

    // Kafka'ya ödeme bilgisi gönder
    await sendPaymentSuccessMessage({ orderId, cardName, amount, cardNumber: card.cardNumber });

    res.status(200).json({
      message: 'Ödeme başarıyla tamamlandı',
      paymentInfo: { orderId, amount, cardName, cardNumber: card.cardNumber.slice(-4) },
    });
  } catch (error) {
    res.status(500).json({ message: 'Ödeme sırasında bir hata oluştu', error: error.message });
  }
});

router.post('/add-card', async (req, res) => {
  try {
    const { cardName, cardNumber, expiryDate, cvv } = req.body;

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ message: 'Eksik kredi kartı bilgileri' });
    }

    const existingCard = await CreditCard.findOne({ cardNumber });

    if (existingCard) {
      return res.status(400).json({ message: 'Bu kart zaten kayıtlı' });
    }

    const newCard = new CreditCard({ cardName, cardNumber, expiryDate, cvv });
    await newCard.save();

    res.status(201).json({ message: 'Kredi kartı başarıyla eklendi', card: newCard });
  } catch (error) {
    res.status(500).json({ message: 'Kart ekleme sırasında bir hata oluştu', error: error.message });
  }
});

export default router;
