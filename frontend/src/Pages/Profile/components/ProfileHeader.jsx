import React from 'react';
import profile from '../../../assets/profile.png';

const ProfileHeader = () => (
  <div className="profile-header">
    <div className="profile-photo">
      <img src={profile} alt="Profile" />
      <div className="empty-photo"></div>
    </div>
    <h1>Profil</h1>
  </div>
);

export default ProfileHeader;
