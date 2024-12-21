import React from 'react';
import { Result } from 'antd';


// Siparişlerin listelendiği kısım
const Orders = ({ orders, ordersLoading, ordersError }) => (
  <div className="orderitems">
    <h2>Siparişlerim</h2>

    {ordersLoading ? (
      <p>Loading orders...</p>
    ) : ordersError ? (
      <p>Error: {ordersError}</p>
    ) : (
      
      <ul className="orders-list">
            {orders.length === 0 && 
    <Result
    status="404"
    subTitle="Henüz, Sipariş Vermediniz."
  />
    
    }
        {orders.map((order) => (
          <li key={order._id} className="order-container">
            <h3>Sipariş Numarası: {order._id}</h3>
            <p>Toplam Tutar: {order.amount} TL</p>
            <p>Adres: {order.address.adress}</p>
            <p >Ödeme Durumu: {order.status}</p>
            <div className="orderitems-format-main">
              <p>Ürün</p>
              <p>İsim</p>
              <p>Fiyat</p>
              <p>Adet</p>
              <p>Toplam</p>
            </div>
            <hr />
            {order.products.map((product) => (
              <div key={product.productId || product.title}> {/* Ensure the key is unique */}
                <div className="orderitems-format">
                  <img className="orderitems-product-icon" src={product.image} alt={product.title} />
                  <p className="orderitems-product-title">{product.title}</p>
                  <p>{product.price} TL</p>
                  <p>{product.quantity}</p>
                  <p>{parseFloat(product.price) * parseInt(product.quantity)} TL</p> {/* Fixing quantity issue */}
                </div>
                <hr />
              </div>
            ))}
          </li>
        ))}
      </ul>
    )} 
  </div>
);

export default Orders;
