import React, { useContext } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {

  const {product} = props;
  // const {addToCart} = useContext(ShopContext);

  return (
    <div className="productdisplay" style={{marginBottom:"200px"}}>
      <div className="productdisplay-left">

        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.title}</h1>
        <p className="productdisplay-right-category"><span>Kategori :</span> {product.category}</p>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{product.price-30} TL</div>
          <div className="productdisplay-right-price-new">{product.price} TL</div>
        </div>
        <div className="productdisplay-right-description">
          <h3>Ürün Bilgisi</h3>
          <p>{product.description}</p>
        </div>
        <div className="productdisplay-right-size">
          <br />

        </div>
        <button onClick={()=>{addToCart(product.id)}}>Sepete Ekle</button>
        {/* <p className="productdisplay-right-category"><span>Category :</span> Women, T-shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p> */}
      </div>
    </div>
  );
};

export default ProductDisplay;
