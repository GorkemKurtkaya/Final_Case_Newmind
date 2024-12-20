import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cardName: {
    type: String
  },
  
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
