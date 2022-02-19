import React, { useState } from 'react';
import axios from 'axios';

 
const LoginForm = () => {
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  let emailErrorMessage = "";
  //eslint-disable-next-line
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!EMAIL_REGEX.test(emailLog)) {
    emailErrorMessage = "email non valide"
  }
 
  axios.defaults.withCredentials = true;
  const loginin = () => {
    if (emailErrorMessage !== "") {
      return window.alert("email non valide!")
    }
    axios.post("http://localhost:4200/api/auth/login", {
      email: emailLog,
      password: passwordLog,
    }).then((response) => { 
      if (response.data.auth) {
        window.location.reload();
      } 
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <img className="login_pic" src="https://picsum.photos/478/200/?random" alt="another random landscape" />
      <div className="login_form">
        <h2>login</h2>
        <div>
          <label htmlFor="email">email:</label>
          <input className="form_tools" id="email" type='email' name='email' placeholder='email...' onChange={(e) => {setEmailLog(e.target.value)}}/>
        </div>
        <div className="loginPass">
          <label htmlFor="password">mot de passe:</label>
          <input className="form_tools" id="password" type='password' name='password' placeholder='password...' onChange={(e) => {setPasswordLog(e.target.value)}}/>
        </div>
        <button onClick={loginin}>Login</button>
      </div>
    </div>
  )
}


export default LoginForm;
