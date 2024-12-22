import React, { useContext, useState,useEffect } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";
import { message } from "antd";


// Ürün detaylarının gösterildiği kısım
const ProductDisplay = (props) => {
  const { productId } = useParams();
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [messageApi, contextHolder] = message.useMessage();


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("http://localhost:3000/auth/checkUser", {
            method: "GET",
            credentials: "include", 
          });
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            console.info("Kullanıcı oturumu kontrol edilemedi.");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          setIsAuthenticated(false);
        }
      };
  
      checkAuth();
    }, []);


  const info = () => {
    messageApi.info("Ürün Sepete Eklendi");
  };

  const calculateDiscountedPrice = (price, category) => {
    if (category.toLowerCase() === "notebook") {
      return price / 0.75; 
    }
    return price;
  };

  const discountedPrice = calculateDiscountedPrice(product.price, product.category);

  return (
    <div className="productdisplay" style={{ marginBottom: "200px" }}>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.title}</h1>
        <p className="productdisplay-right-category">
          <span>Kategori :</span> {product.category}
        </p>
        <div className="productdisplay-right-prices">
          {product.category.toLowerCase() === "notebook" ? (
            <>
              <div className="productdisplay-right-price-old">
                {discountedPrice.toFixed(2)} TL
              </div>
              <div className="productdisplay-right-price-new">
                {product.price} (%25 İndirimli)
              </div>
            </>
          ) : (
            <div className="productdisplay-right-price-new">
              {product.price} TL
            </div>
          )}
        </div>
        <div className="productdisplay-right-description">
          <h3>Ürün Bilgisi</h3>
          <p>{product.description}</p>
        </div>
        <button
          onClick={() => {
            if (!isAuthenticated) {
              alert("Ürün eklemek için giriş yapmalısınız.");
              return;
            }
            addToCart(productId);
            info();
          }}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
