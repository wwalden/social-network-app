import React from 'react';
import Banner from '../components/banner/Banner'
import '../styles/Login.css';

const Login = () => {
  return (
    <div>
      <Banner />
      <div id="transition"></div>
      <div id="main_page">
        <h2>Vous êtes bien sur la page "Login"</h2>
      </div>
    </div>
  )
}


export default Login;
