import React, { useState } from 'react';
import ProductModal from '../../components/productmodal';
import ProductEditModal from '../../components/productEditModal';
import ProductDeleteModal from '../../components/productDeleteModal';

const ProductItem = ({ product, products, setProducts }) => { 
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [productData, setProductData] = useState(product);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggle = () => setModal(!modal);
  const editProduct = () => setEdit(!edit);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const handleSave = (updatedProduct) => {
    setProductData(updatedProduct);
  };

  const handleRemove = (id) => {
    console.log('remove id', id);
    const remainingItems = products.filter(item => item.id !== id);
    setProducts(remainingItems); 
  }

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={toggle}>
        <img className="product-card-image" src={productData.image} alt={productData.title} />
      </div>
      <div className="product-card-content">
        <h5 className="product-type">{productData.category}</h5>
        <h2 className="product-card-title">{productData.title}</h2>
        <p className="product-description">{productData.description.substring(0, 50)}...</p>
        <div className="product-card-footer">
          <button className="price">{productData.price} ₺</button>
          <button className="add-to-cart">Sepete ekle</button>
        </div>
        <button className="edit-button" onClick={editProduct}>Edit</button>
        <button className="delete-button" onClick={toggleDeleteModal}>Delete</button>
      </div>


      <ProductModal product={productData} isOpen={modal} toggle={toggle} />

      <ProductEditModal
        product={productData}
        isOpen={edit}
        editProduct={editProduct}
        onSave={handleSave} 
      />


      <ProductDeleteModal 
        product={productData}
        isOpen={isDeleteModalOpen} 
        toggle={toggleDeleteModal} 
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default ProductItem;
