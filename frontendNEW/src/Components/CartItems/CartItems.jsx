import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";


const CartItems = () => {
  const {cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

  // Statik ürün verileri (örnek ürünler)
  const products = [
    { id: 1, name: "Product 1", image: "https://via.placeholder.com/100", new_price: 50 },
    { id: 2, name: "Product 2", image: "https://via.placeholder.com/100", new_price: 75 },
    { id: 3, name: "Product 3", image: "https://via.placeholder.com/100", new_price: 100 },
  ];

  // Eğer sepetteki ürün sayısı 0'dan büyükse, sepette o ürünü render et
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Ürünler</p>
        <p>İsim</p>
        <p>Fiyat</p>
        <p>Adet</p>
        <p>Toplam</p>
        <p>Sil</p>
      </div>
      <hr />
      {products.map((e) => {
        // Statik ürünlerin sepette var olup olmadığını kontrol et
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img className="cartitems-product-icon" src={e.image} alt={e.name} />
                <p className="cartitems-product-title">{e.name}</p>
                <p>{e.price} TL</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>{e.price * cartItems[e.id]} TL</p>
                <img
                  onClick={() => removeFromCart(e.id)}
                  className="cartitems-remove-icon"
                  src={cross_icon} 
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Sepet Tutarı</h1>
          <div>
            <hr />
            <hr />
            <div className="cartitems-total-item">
              <h3>Toplam</h3>
              <h3>{getTotalCartAmount()} TL</h3>
            </div>
          </div>
          <button>Sepeti Onayla</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
