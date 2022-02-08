import '../../styles/Banner.css'
import React from 'react';



const NavBar = () => {
  return (
    <div className="groupo_navbar">
      <a href="http://localhost:3000/home"><i className="fas fa-igloo"></i></a>
      <a href="http://localhost:3000/profile"><i className="fas fa-user"></i></a>
      <a href="http://localhost:3000/logout"><i className="fas fa-sign-out-alt"></i></a>
    </div>
  )
}


export default NavBar;
