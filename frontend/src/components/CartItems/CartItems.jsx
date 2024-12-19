import React, { useState, useEffect } from "react";
import "./CartItems.css";
import { Modal, Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import {  message } from 'antd';

const CartItems = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = Cookies.get("user");
  const [form] = Form.useForm(); 
  const [messageApi, contextHolder] = message.useMessage(); 




  const info = () => {
    messageApi.success("Siparişiniz başarıyla tamamlandı! Teşekkür ederiz.");
  };

  const fetchCartItemsWithDetails = async () => {
    try {
      const basketResponse = await axios.get(`http://localhost:3000/basket/${userId}`);
      const cartData = basketResponse.data.response;

      if (!cartData || cartData.length === 0) {
        setCartProducts([]);
        setLoading(false);
        return;
      }

      const cartProductsWithDetails = await Promise.all(
        cartData.map(async (cartItem) => {
          const productResponse = await axios.get(`http://localhost:3000/product/find/${cartItem.productId}`);
          return { ...productResponse.data, quantity: cartItem.quantity, productId: cartItem.productId };
        })
      );

      setCartProducts(cartProductsWithDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  const handleUpdateCartItem = async (productId, action) => {
    try {
      await axios.post(`http://localhost:3000/basket/update`, {
        userId,
        productId,
        action,
      });
      await fetchCartItemsWithDetails(); // Sepeti yeniden yükle
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveCart = async () => {
    try {
      await axios.delete(`http://localhost:3000/basket/${userId}`);
      setCartProducts([]); // Sepeti temizle
    } catch (error) {
      console.error("Error removing cart items:", error);
    }
  };

  const getTotalCartAmount = () => {
    return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleCheckout = async (paymentData) => {
    try {
      // 1. Sipariş oluştur
      const orderResponse = await axios.post(
        "http://localhost:3000/orders",
        {
          userId,
          products: cartProducts,
          address: paymentData.address,
          totalAmount: getTotalCartAmount(),
        },
        { withCredentials: true }
      );

      // Response'dan order._id'yi alıyoruz
      const orderId = orderResponse.data.order?._id;
      
      console.log("Created Order Response:", orderResponse.data); // Debugging için
      console.log("Order ID:", orderId); // Debugging için

      if (!orderId) {
        throw new Error("Order ID alınamadı!");
      }

      // 2. Ödeme işlemi
      const paymentResponse = await axios.post(
        "http://localhost:3500/payment",
        {
          orderId: orderId,
          amount: getTotalCartAmount(),
          cardName: paymentData.cardName,
          cardNumber: paymentData.cardNumber,
          expiryDate: paymentData.expiryDate,
          cvv: paymentData.cvv,
          address: paymentData.address
        },
        { withCredentials: true }
      );

      if (paymentResponse.data.message === "Ödeme Başarılı") {
        await handleRemoveCart();
        setIsModalOpen(false);
        message.success("Siparişiniz başarıyla tamamlandı! Teşekkür ederiz.");
      } else {
        throw new Error("Ödeme sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Checkout error details:", error.response?.data || error.message);
      alert("Sipariş tamamlama sırasında bir hata oluştu: " + (error.response?.data?.message || error.message));
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
    return <div className="cartitems">Sepetiniz boş</div>;
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
            rules={[{ required: true, message: "Lütfen kart üzerindeki ismi girin" }]}
          >
            <Input placeholder="Ad Soyad" />
          </Form.Item>
          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={[{ required: true, message: "Lütfen kart numarasını girin" }]}
          >
            <Input placeholder="XXXX XXXX XXXX XXXX" maxLength={16} />
          </Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Item
              label="Son Kullanma Tarihi"
              name="expiryDate"
              rules={[{ required: true, message: "Lütfen son kullanma tarihini girin" }]}
            >
              <Input placeholder="AA/YY" maxLength={5} />
            </Form.Item>
            <Form.Item
              label="CVV"
              name="cvv"
              rules={[{ required: true, message: "Lütfen CVV kodunu girin" }]}
            >
              <Input placeholder="CVV" maxLength={3} />
            </Form.Item>
          </div>
          <h3>Adres Bilgileri</h3>
          <Form.Item
            label="Adres"
            name={["address", "adress"]}
            rules={[{ required: true, message: "Lütfen Adresinizi Giriniz" }]}
          >
            <Input placeholder="Adres" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CartItems;