import axios from "axios";

const PAYMENT_URL = "http://localhost:3500/payment";
const ORDER_URL = "http://localhost:3000/orders";

export const checkout = async (userId, cartProducts, paymentData) => {
  try {
    // 1. Sipariş oluşturma kısmı
    const orderResponse = await axios.post(
      ORDER_URL,
      {
        userId,
        products: cartProducts,
        address: paymentData.address,
        totalAmount: cartProducts.reduce((total, product) => total + product.price * product.quantity, 0),
      },
      { withCredentials: true }
    );

    const orderId = orderResponse.data.order?._id;
    if (!orderId) {
      throw new Error("Order ID alınamadı!");
    }

    // 2. Ödeme işlemi
    const paymentResponse = await axios.post(
      PAYMENT_URL,
      {
        orderId: orderId,
        amount: cartProducts.reduce((total, product) => total + product.price * product.quantity, 0),
        cardName: paymentData.cardName,
        cardNumber: paymentData.cardNumber,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
        address: paymentData.address,
      },
      { withCredentials: true }
    );

    if (paymentResponse.data.message === "Ödeme Başarılı") {
      return { success: true };
    } else {
      throw new Error("Ödeme sırasında bir hata oluştu.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};
