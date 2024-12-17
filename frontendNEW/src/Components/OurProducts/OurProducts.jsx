import React from 'react';
import './OurProducts.css';
import Item from '../Item/Item';

const OurProducts = (props) => {
  return (
    <div className='new-collections'>
      <h1>Ürünlerimiz </h1>
      <hr />
      <div className="collections">
        {props.data.map((item) => (
          <Item 
            key={item._id} 
            id={item._id} 
            name={item.title} 
            image={item.image} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
