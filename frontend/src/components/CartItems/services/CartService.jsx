import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchCartItems = async (userId) => {
  try {
    const basketResponse = await axios.get(`${BASE_URL}/basket/${userId}`);
    const cartData = basketResponse.data.response;

    if (!cartData || cartData.length === 0) {
      return [];
    }

    const cartProductsWithDetails = await Promise.all(
      cartData.map(async (cartItem) => {
        const productResponse = await axios.get(`${BASE_URL}/product/find/${cartItem.productId}`);
        return { ...productResponse.data, quantity: cartItem.quantity, productId: cartItem.productId };
      })
    );

    return cartProductsWithDetails;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const updateCartItem = async (userId, productId, action) => {
  try {
    await axios.post(`${BASE_URL}/basket/update`, {
      userId,
      productId,
      action,
    });
    window.location.reload();
    await fetchCartItemsWithDetails();
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeCartItems = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/basket/${userId}`);
  } catch (error) {
    console.error("Error removing cart items:", error);
    throw error;
  }
};
