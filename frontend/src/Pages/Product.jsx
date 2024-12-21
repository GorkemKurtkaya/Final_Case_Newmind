import React, { useEffect, useState } from "react";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import Breadcrums from "../Components/BreadCrums/BreadCrums";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../Context/api";

// Ürün detaylarının gösterildiği kısım
const Product = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook'u ile sayfa yüklendiğinde ürün bilgilerini getiriyoruz
  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (productId) {  
        try {
          const response = await fetchProduct(productId); 
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false); 
        }
      }
    };

    fetchSingleProduct();
  }, [productId]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
