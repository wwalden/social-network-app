import React from 'react';
import Banner from '../components/banner/Banner';
import LoginForm from '../components/login/LoginForm'
import '../styles/Login.css';

const Login = () => {
  return (
    <div>
      <Banner />
      <div id="transition"></div>
      <div className="login_form">
        <LoginForm/>
      </div>
    </div>
  )
}


export default Login;
