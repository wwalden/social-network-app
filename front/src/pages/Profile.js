import React from 'react';
import Banner from '../components/banner/Banner'
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div>
      <Banner />
      <div id="transition"></div>
      <div id="main_page">
        <h2>Vous êtes bien sur la page "Profile"</h2>
      </div>
    </div>
  )
}


export default Profile;