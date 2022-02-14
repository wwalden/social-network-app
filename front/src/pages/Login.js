import '../styles/Login.css';
import React from 'react';
import Banner from '../components/banner/Banner';
import LoginForm from '../components/login/LoginForm'


const Login = () => {
  return (
    <div>
      <Banner />
      <div id="transition"></div>
      <div className="login_form">
        <LoginForm/>
        <p>vous n'avez pas de compte? <a className="underlined" href="http://localhost:3000/signin">cliquez ici</a> pour en créer un</p>
      </div>
    </div>
  )
}


export default Login;
