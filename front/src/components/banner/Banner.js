import React from 'react';
import logoWithName from '../../assets/logo.png'
import logo from '../../assets/icon.png'
import Clock from './Clock';
import NavBar from './NavBar';
import ConnectionCheck from './ConnectionCheck';


const Banner = () => {
  return (
    <div className="groupo_banner">
      <img src={logoWithName} alt='Logo Groupomania with text' className='groupo_logo' />
      <Clock />
      <img className="logo_anim" alt='Logo Groupomania' src={logo}/>
      <NavBar />
      <ConnectionCheck />
    </div>
  )
}


export default Banner;

