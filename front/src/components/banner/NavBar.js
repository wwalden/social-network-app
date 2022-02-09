import '../../styles/Banner.css'
import React from 'react';
import Cookies from 'js-cookie';



const NavBar = () => {

  const logout = () => {
    Cookies.remove('jwt');
    Cookies.remove('userId')
  }


  return (
    <div className="groupo_navbar">
      <a href="http://localhost:3000/home"><i className="fas fa-igloo"></i></a>
      <a href="http://localhost:3000/profile"><i className="fas fa-user"></i></a>
      <a href="http://localhost:3000/logout" onClick={logout}><i className="fas fa-sign-out-alt"></i></a>
    </div>
  )
}


export default NavBar;
