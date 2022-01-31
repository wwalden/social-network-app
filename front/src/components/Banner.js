import React from 'react';
import logo from '../assets/logo.png'
import '../styles/Banner.css';

const Banner = () => {
  return (
    <div className="groupo_banner">
      <img src={logo} alt='Logo Groupomania' className='groupo_logo' />
    </div>
  )
}


export default Banner;
