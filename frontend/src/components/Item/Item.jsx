import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';


// Ürünlerin listelendiği kısım
const Item = (props) => {
  const calculateDiscountedPrice = (price, category) => {
    if (category === "notebook") {
      return price / 0.75; 
    }
    return price;
  };

  const discountedPrice = calculateDiscountedPrice(props.price, props.category);

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="products" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        {props.category === "notebook" ? (
          <>
            <div className="item-price-old">{discountedPrice.toFixed(2)} TL</div>
            <div className="item-price-new">{props.price} TL (%25 İndirimli)</div>
          </>
        ) : (
          <div className="item-price">{props.price} TL</div>
        )}
      </div>
    </div>
  );
};

export default Item;
