import React, { createContext, useEffect, useState } from "react";
import { fetchProducts } from "./api"; // Yeni API fonksiyonlarını içe aktarın

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    // Sepet başta boş olacak, 3 adet ürün olduğunu varsayarak her ürünün sayısı 0
    [1, 2, 3].forEach((id) => {
      cart[id] = 0; // Başlangıçta ürün sayısı 0
    });
    return cart;
  };
  
  const addToCart = (id) => {
    const newCart = { ...cartItems };
    newCart[id] += 1;
    setCartItems(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = { ...cartItems };
    if (newCart[id] > 0) {
      newCart[id] -= 1;
    }
    setCartItems(newCart);
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Yeni API'den ürünleri alma işlemi
  const fetchInfo = async () => {
    try {
      const response = await fetchProducts(); // Yeni API'den ürünleri çekiyoruz
      setProducts(response.data); // Gelen veriyi `products` state'ine atıyoruz
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

    // Sepet toplamını hesaplamak
    const getTotalCartAmount = () => {
      const products = [
        { id: 1, new_price: 50 },
        { id: 2, new_price: 75 },
        { id: 3, new_price: 100 },
      ];
      let total = 0;
      products.forEach((product) => {
        total += product.new_price * cartItems[product.id];
      });
      return total;
    };
  

  useEffect(() => {
    fetchInfo();
  }, []);

  const contextValue = { cartItems, addToCart, removeFromCart, getTotalCartAmount };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
