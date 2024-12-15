import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const ProductDeleteModal = ({product, isOpen, toggle, handleRemove }) => {

  return (
    <Modal isOpen={isOpen} toggle={toggle} backdrop={true} keyboard={true}>
      <ModalHeader toggle={toggle}>Ürünü Sil</ModalHeader>
      <ModalBody>
        <h2>Bu ürünü silmek istediğinizden emin misiniz?</h2>
        <p>Bu işlem geri alınamaz.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={()=>handleRemove(product.id)}>Evet, sil</Button>
        <Button color="secondary" onClick={toggle}>Hayır, iptal</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductDeleteModal;
