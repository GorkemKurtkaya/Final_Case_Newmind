import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const ProductEditModal = ({ product, isOpen, editProduct, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value
        });
    };

    const handleSave = () => {
        onSave(editedProduct);
        editProduct(); 
    };

    return (
        <Modal size='lg' isOpen={isOpen} toggle={editProduct} backdrop={true} keyboard={true}>
            <ModalHeader id="modalTitle" toggle={editProduct}>Ürünü Düzenle</ModalHeader>
            <ModalBody>
                <form>
                    <label htmlFor="editTitle">Başlık:</label>
                    <input type="text" id="editTitle" name="title" value={editedProduct.title} onChange={handleChange} />

                    <Label for="editDescription">
                        
                    </Label>
                    <Input
                        id="editDescription"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                    />

                    <label htmlFor="editPrice">Fiyat:</label>
                    <input type="text" id="editPrice" name="price" value={editedProduct.price} onChange={handleChange} />



                    <Label for="exampleFile">
                        File
                    </Label>
                    <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                    />
                </form>
            </ModalBody>
            <ModalFooter className="product-card-footer">
                <Button color="primary" onClick={handleSave}>
                    Kaydet
                </Button>
                <Button color="secondary" onClick={editProduct}>
                    Kapat
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ProductEditModal;
