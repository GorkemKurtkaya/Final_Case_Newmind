import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ProfileInfo = ({
  user,
  isEditing,
  setIsEditing,
  name,
  setName,
  email,
  setEmail,
  handleSaveChanges,
}) => (
  <div className="profile-info">
    <div className="form-group">
      <label>İsim:</label>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="profile-input"
        />
      ) : (
        <p>{user.name}</p>
      )}
      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={() => setIsEditing(!isEditing)}
        className="edit-icon"
      />
    </div>
    <div className="form-group">
      <label>Email:</label>
      {isEditing ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile-input"
        />
      ) : (
        <p>{user.email}</p>
      )}
      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={() => setIsEditing(!isEditing)}
        className="edit-icon"
      />
    </div>
    {isEditing && (
      <div className="form-group">
        <button onClick={handleSaveChanges} className="save-button">Onayla</button>
      </div>
    )}
  </div>
);

export default ProfileInfo;
