import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Veri çekme hatası:", error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details-card">
            <h2 className='product-details-card-title'>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p className='product-details-card-description'>{product.description}</p>
            <div className="product-details-card-footer">
                <button className="price">{product.price} ₺</button>
                <button className="add-to-cart">Sepete ekle</button>
            </div>
        </div>
    );
};

export default ProductDetails;
