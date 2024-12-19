import React, { useState, useEffect } from 'react';
import './Profile.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import profile from '../../assets/profile.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = Cookies.get('user');
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = Cookies.get('user');
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await fetch(`http://localhost:3000/orders/find/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        const ordersWithProducts = await Promise.all(
          data.map(async (order) => {
            const products = await Promise.all(
              order.products.map(async (product) => {
                const productResponse = await fetch(`http://localhost:3000/product/find/${product.productId}`);
                const productData = await productResponse.json();
                return { ...product, ...productData };
              })
            );
            return { ...order, products };
          })
        );
        setOrders(ordersWithProducts);
      } catch (err) {
        setOrdersError(err.message);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const userId = Cookies.get('user');
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await fetch(`http://localhost:3000/users/changeNameandMail`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const data = await response.json();
      setUser(data);
      setIsEditing(false);
      window.location.replace("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="profile-container"><p>Loading...</p></div>;
  if (error) return <div className="profile-container"><p>Error: {error}</p></div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          <img src={profile} alt="Profile" />
          <div className="empty-photo"></div>
        </div>
        <h1>Profil</h1>
      </div>

      <div className="profile-info">
        <div className="form-group">
          <label>İsim:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="profile-input"
            />
          ) : (
            <p>{user.name}</p>
          )}
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditToggle} className="edit-icon" />
        </div>

        <div className="form-group">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="profile-input"
            />
          ) : (
            <p>{user.email}</p>
          )}
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditToggle} className="edit-icon" />
        </div>

        {isEditing && (
          <div className="form-group">
            <button onClick={handleSaveChanges} className="save-button">Onayla</button>
          </div>
        )}
      </div>

      <div className="orderitems">
        <h2>Siparişlerim</h2>
        {ordersLoading ? (
          <p>Loading orders...</p>
        ) : ordersError ? (
          <p>Error: {ordersError}</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-container">
                <h3>Sipariş Numarası: {order._id}</h3>
                <p>Toplam Tutar: {order.amount} TL</p>
                <p>Adres: {order.address.adress}</p>
                <div className="orderitems-format-main">
                        <p>Ürün</p>
                        <p>İsim</p>
                        <p>Fiyat</p>
                        <p>Adet</p>
                        <p>Toplam</p>
                      </div>
                      <hr />
                  {order.products.map((product) => (
                    <div key={product.productId}>         
                      <div className="orderitems-format">
                        <img className="orderitems-product-icon" src={product.image} alt={product.title} />
                        <p className="orderitems-product-title">{product.title}</p>
                        <p>{product.price} TL</p>
                        <div className="orderitems-quantity-controls">
                          <span className="orderitems-quantity">{product.quantity}</span>
                        </div>
                        <p>{product.price * product.quantity} TL</p>
                      </div>
                      <hr />
                    </div>
                  ))}

              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Profile;