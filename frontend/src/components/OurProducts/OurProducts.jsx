import React from 'react';
import './OurProducts.css';
import Item from '../Item/Item';


// Ürünlerin listelendiği kısım
const OurProducts = (props) => {
  return (
    <div className='our-products'>
      <h1>Ürünlerimiz </h1>
      <hr />
      <div className="products">
        {props.data.map((item) => (
          <Item 
            key={item._id} 
            id={item._id} 
            name={item.title} 
            image={item.image} 
            price={item.price} 
            category={item.category} 
          />
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
