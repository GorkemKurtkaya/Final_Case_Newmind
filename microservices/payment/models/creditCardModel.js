import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  cardName: { type: String, required: true  },
  cardNumber: { type: String, required: true, unique: true, minLength: 16, maxLength: 16 },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

export default mongoose.model('CreditCard', creditCardSchema);
