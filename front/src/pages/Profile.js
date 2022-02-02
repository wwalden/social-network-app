import React from 'react';
import Banner from '../components/banner/Banner'
import Aside from '../components/profile/Aside'
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div>
      <Banner />
      <div id="transition"></div>
      <div className="center">
        <Aside className={"profile_main"}/>
      </div>
    </div>
  )
}


export default Profile;