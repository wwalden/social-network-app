import React from 'react';
import logoWithName from '../../assets/logo.png'
import logo from '../../assets/icon.png'
import '../../styles/Banner.css';
import Clock from './Clock';
import NavBar from './NavBar';


const Banner = () => {
  return (
    <div className="groupo_banner">
      <img src={logoWithName} alt='Logo Groupomania with text' className='groupo_logo' />
      <Clock />
      <img className="logo_anim" alt='Logo Groupomania' src={logo}/>
      <NavBar />
    </div>
  )
}


export default Banner;
