import React from "react";


// Toplam tutarın gösterildiği kısım
const TotalAmount = ({ totalAmount, setIsModalOpen, handleRemoveCart }) => {
  return (
    <div className="cartitems-total">
      <h1>Sepet Tutarı</h1>
      <div className="cartitems-total-item">
        <h3>Toplam</h3>
        <h3>{totalAmount} TL</h3>
      </div>
      <button className="cartitems-total-button" onClick={() => setIsModalOpen(true)}>
        Sepeti Onayla
      </button>
      <button className="cartitems-total-delete-button" onClick={handleRemoveCart}>
        Sepeti Boşalt
      </button>
    </div>
  );
};

export default TotalAmount;
