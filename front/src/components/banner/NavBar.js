import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const NavBar = () => {
  const jwtcookie = Cookies.get('jwt');
  const logout = async () => {
    Cookies.remove('jwt');
    Cookies.remove('userId');
    localStorage.removeItem("isAdmin");
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:4200/api/auth/logout", {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    });

    if (response.status !== 200) {
      alert("logout impossible!")
    }
  }

  return (
    <div className="groupo_navbar">
      <a href="http://localhost:3000/home"><i className="navbar_icon fas fa-igloo"></i></a>
      <a href="http://localhost:3000/profile"><i className="navbar_icon fas fa-user"></i></a>
      <a href="http://localhost:3000/logout" onClick={logout}><i className="navbar_icon fas fa-sign-out-alt"></i></a>
    </div>
  )
}


export default NavBar;
