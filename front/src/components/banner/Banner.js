import React from 'react';
import logoWithName from '../../assets/logo.png'
import logo from '../../assets/icon.png'
import '../../styles/Banner.css';
import Clock from './Clock';


const Banner = () => {
  return (
    <div className="groupo_banner">
      <img src={logoWithName} alt='Logo Groupomania' className='groupo_logo' />
      <Clock />
      <img className="logo_anim" src={logo}/>

    </div>
  )
}


export default Banner;
