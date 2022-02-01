import React from 'react';
import '../../styles/Banner.css';



const NavBar = () => {
  return (
    <div className="groupo_navbar">
      <a href="http://localhost:3000/home"><i class="fas fa-igloo"></i></a>
      <a href="http://localhost:3000/profile"><i class="fas fa-user"></i></a>
      <a href="http://localhost:3000/logout"><i class="fas fa-sign-out-alt"></i></a>
    </div>
  )
}


export default NavBar;
