import React, { useState, useEffect } from 'react';
import './Profile.css';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import Orders from './components/ProfileOrders';
import { fetchUserData, fetchOrders, updateUserData } from './services/ProfileService';

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
    const fetchUser = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setOrdersError(err.message);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const updatedUser = await updateUserData({ name, email });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="profile-container"><p>Loading...</p></div>;
  if (error) return <div className="profile-container"><p>Error: {error}</p></div>;

  return (
    <div className="profile-container">
      <ProfileHeader />
      <ProfileInfo
        user={user}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        handleSaveChanges={handleSaveChanges}
      />
      <Orders orders={orders} ordersLoading={ordersLoading} ordersError={ordersError} />
    </div>
  );
};

export default Profile;
