import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {  message } from 'antd';
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const userId = Cookies.get("user");

  // Sepeti API'den getir
  const fetchCartItems = async () => {
    const userId = Cookies.get('user');
    // try {
    //   const response = await axios.get(`http://localhost:3000/basket/${userId}`);
    //   const cartData = response.data; // Sepet verisi
  
    //   // Eğer products undefined veya null ise boş dizi ile başlat
    //   const products = Array.isArray(cartData.products) ? cartData.products : [];
    //   const cart = {};
    //   products.forEach((item) => {
    //     cart[item.productId] = item.quantity;
    //   });
    //   setCartItems(cart);
    // } catch (error) {
    //   console.error("Error fetching cart items:", error);
    // }
    console.log(userId);
  };

  // Sepete ekleme
  const addToCart = async (productId) => {
    try {
      const payload = {
        userId: userId,
        product: {
          productId: productId,
          quantity: 1
        }
      };

      await axios.post(`http://localhost:3000/basket`, payload);

      setCartItems(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
      message.success("Ürün sepete eklendi");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Sepetten çıkarma
  const removeFromCart = async (productId) => {
    try {
      const updatedCart = { ...cartItems };
      if (updatedCart[productId] > 0) {
        updatedCart[productId] -= 1;

        if (updatedCart[productId] === 0) {
          delete updatedCart[productId];
        }

        await axios.post(`/api/basket`, {
          userId,
          product: {
            productId,
            quantity: updatedCart[productId] || 0,
          },
        });
      }

      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Sepeti tamamen sil
  const clearCart = async () => {
    try {
      await axios.delete(`/api/basket/${userId}`);
      setCartItems({});
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Sepet toplamını hesapla
  const getTotalCartAmount = () => {
    let total = 0;
    Object.keys(cartItems).forEach((productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      if (product) {
        total += product.new_price * cartItems[productId];
      }
    });
    return total;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];;
      }
    }
    return totalItem;
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
    userId,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
