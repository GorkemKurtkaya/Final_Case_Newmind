import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {  message } from 'antd';
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const userId = Cookies.get("user");


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
  const contextValue = {
    cartItems,
    addToCart,
    getTotalCartAmount,
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
