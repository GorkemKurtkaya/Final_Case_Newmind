import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const ProductModal = ({ product, isOpen, toggle }) => {
  const openProductPage = () => {
    window.open(`/product/${product.id}`, '_blank');
  };

  return (
    <Modal size='lg' isOpen={isOpen} toggle={toggle} backdrop={true} keyboard={true} >
      <ModalHeader  id="modalTitle" toggle={toggle}>{product.title}</ModalHeader>
      <ModalBody>
        <div>
        <div className='modal-content' >
          <img id="modalImage" src={product.image} alt="Product Image" className="modal-image" />
          <p className="modal-description">{product.description}</p>
          <button className="modal-price">{product.price} ₺</button>
        </div>
        </div>
      </ModalBody>
      <ModalFooter className="product-card-footer">
        <Button color="primary" onClick={openProductPage}>
          Detaylı İncele
        </Button>
        <Button color="secondary" onClick={toggle}>
          Kapat
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;
