import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";


// Kategoriye göre ürünlerin listelendiği kısım
const ShopCategory = (props) => {

  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInfo = () => { 
    try{
      fetch('http://localhost:3000/product/') 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }
    catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false); 
    }}
      useEffect(() => {
      fetchInfo();
    }, [])

    if (loading) {
      return <div>Loading...</div>;
    }
  

    
  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-products">
        {allproducts.map((item) => {
            if(props.category===item.category)
            {
              return (
               
                  <Item id={item._id} name={item.title} image={item.image} price={item.price} category={item.category} />
                
              );
            }
            else
            {
              return null;
            }
        })}
      </div>
      <div className="shopcategory-loadmore">
      <Link to='/' style={{ textDecoration: 'none' }}>Daha Fazlasını Keşfet</Link>
      </div>
    </div>
  );
};

export default ShopCategory;
