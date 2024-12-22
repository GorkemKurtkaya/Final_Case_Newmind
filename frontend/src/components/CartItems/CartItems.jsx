import React, { useState, useEffect } from "react";
import "./CartItems.css";
import { Modal, Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { message } from 'antd';
import Cookies from "js-cookie";
import { fetchCartItems, updateCartItem, removeCartItems } from "./services/CartService";
import { checkout } from "./services/PaymentService";
import {  Result } from 'antd';
import { useNavigate } from 'react-router-dom';



// Sepetimizdeki ürünleri listelemek için CartItems
const CartItems = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = Cookies.get("user");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const info = () => {
    messageApi.success("Siparişiniz başarıyla tamamlandı! Teşekkür ederiz.");
  };

  const fetchCartItemsWithDetails = async () => {
    try {
      const cartData = await fetchCartItems(userId);
      setCartProducts(cartData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cart items:", error);
    }
  };

  const handleUpdateCartItem = async (productId, action) => {
    try {
      await updateCartItem(userId, productId, action);
      await fetchCartItemsWithDetails();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveCart = async () => {
    try {
      await removeCartItems(userId);
      setCartProducts([]);
    } catch (error) {
      console.error("Error removing cart items:", error);
    }
  };

  const getTotalCartAmount = () => {
    return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleCheckout = async (paymentData) => {
    try {
      const result = await checkout(userId, cartProducts, paymentData);
      if(paymentData.cardNumber.length !== 16){
        messageApi.error("Kart Numarası 16 haneli olmalıdır.");
      } else if(paymentData.expiryDate.length !== 5){
        messageApi.error("Son Kullanma Tarihi AA/YY formatında olmalıdır.");
      } else if(paymentData.cvv.length !== 3){
        messageApi.error("CVV 3 haneli olmalıdır.");
      }

      if (result.success) {
        await messageApi.success("Siparişiniz başarıyla tamamlandı! Teşekkür ederiz.");
        await handleRemoveCart();
        setIsModalOpen(false);

        navigate('/profile');
      }
    } catch (error) {
      messageApi.error("Sipariş tamamlama sırasında bir hata oluştu. Kart Bilgilerinizi Kontrol Ediniz!!!! " + error.message);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await handleCheckout(values);
    } catch (error) {
      if (error.errorFields) {
        alert("Lütfen tüm alanları doldurun!");
      } else {
        console.error("Form validation error:", error);
      }
    }
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCartItemsWithDetails();
  }, [userId]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (cartProducts.length === 0) {
    return <div className="cartitems"><Result
    status="404"
    subTitle="Sepetinizde ürün bulunmamaktadır."
  /></div>;
  }

  return (
    <div className="cartitems">
      {contextHolder}
      <div className="cartitems-format-main">
        <p>Ürünler</p>
        <p>İsim</p>
        <p>Fiyat</p>
        <p>Adet</p>
        <p>Toplam</p>
      </div>
      <hr />
      {cartProducts.map((product) => (
        <div key={product._id}>
          <div className="cartitems-format">
            <img className="cartitems-product-icon" src={product.image} alt={product.title} />
            <p className="cartitems-product-title">{product.title}</p>
            <p>{product.price} TL</p>
            <div className="cartitems-quantity-controls">
              <button className="cartitems-mini-buttons" onClick={() => handleUpdateCartItem(product._id, "decrement")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="cartitems-quantity">{product.quantity}</span>
              <button className="cartitems-mini-buttons" onClick={() => handleUpdateCartItem(product._id, "increment")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <p>{product.price * product.quantity} TL</p>
            <button className="cartitems-mini-buttons-remove" onClick={() => handleUpdateCartItem(product._id, "remove")}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          <hr />
        </div>
      ))}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Sepet Tutarı</h1>
          <div className="cartitems-total-item">
            <h3>Toplam</h3>
            <h3>{getTotalCartAmount()} TL</h3>
          </div>
          <button className="cartitems-total-button" onClick={() => setIsModalOpen(true)}>
            Sepeti Onayla
          </button>
          <button className="cartitems-total-delete-button" onClick={handleRemoveCart}>
            Sepeti Boşalt
          </button>
        </div>
      </div>

      <Modal
        title="Ödeme Yönetimi"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Ödemeyi Tamamla"
        cancelText="İptal"
      >
        <Form form={form} layout="vertical">
          <h3>Kart Bilgileri</h3>
          <Form.Item
            label="Kart Üzerindeki İsim"
            name="cardName"
            rules={[{ required: true, message: "Lütfen kart üzerindeki ismi girin" }]}>
            <Input placeholder="Ad Soyad" />
          </Form.Item>
          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={[{ required: true, message: "Lütfen kart numarasını girin" }]}>
            <Input placeholder="XXXX XXXX XXXX XXXX" maxLength={16} />
          </Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Item
              label="Son Kullanma Tarihi"
              name="expiryDate"
              rules={[{ required: true, message: "Lütfen son kullanma tarihini girin" }]}>
              <Input placeholder="AA/YY" maxLength={5} />
            </Form.Item>
            <Form.Item
              label="CVV"
              name="cvv"
              rules={[{ required: true, message: "Lütfen CVV kodunu girin" }]}>
              <Input placeholder="CVV" maxLength={3} />
            </Form.Item>
          </div>
          <h3>Adres Bilgileri</h3>
          <Form.Item
            label="Adres"
            name={["address", "adress"]}
            rules={[{ required: true, message: "Lütfen Adresinizi Giriniz" }]}>
            <Input placeholder="Adres" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CartItems;
