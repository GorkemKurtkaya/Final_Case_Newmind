import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faX } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ product, handleUpdateCartItem }) => {
  return (
    <div className="cartitems-format">
      <img className="cartitems-product-icon" src={product.image} alt={product.title} />
      <p className="cartitems-product-title">{product.title}</p>
      <p>{product.price} TL</p>
      <div className="cartitems-quantity-controls">
        <button className="cartitems-mini-buttons" onClick={() => handleUpdateCartItem(product._id, "decrement")}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="cartitems-quantity">{product.quantity}</span>
        <button className="cartitems-mini-buttons" onClick={() => handleUpdateCartItem(product._id, "increment")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p>{product.price * product.quantity} TL</p>
      <button className="cartitems-mini-buttons-remove" onClick={() => handleUpdateCartItem(product._id, "remove")}>
        <FontAwesomeIcon icon={faX} />
      </button>
      <hr />
    </div>
  );
};

export default CartItem;
