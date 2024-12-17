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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = Cookies.get('user');
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'GET',
          credentials: 'include', // Cookie'yi dahil etmek için
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
            <img src={profile} alt="" />
          <div className="empty-photo"></div>
        </div>
        <h1>Profile</h1>
      </div>

      <div className="profile-info">
        <div className="form-group">
          <label>Name:</label>
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
            <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
