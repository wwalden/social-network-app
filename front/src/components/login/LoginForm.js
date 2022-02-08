import '../../css/style.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



const LoginForm = () => {

  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  axios.defaults.withCredentials = true;
  const loginin = () => {
    axios.post("http://localhost:4200/api/auth/login", {
      email: emailLog,
      password: passwordLog,
    }).then((response) => {  
      //console.log(response.data.userId)
      setLoginStatus(response.data.userId) 
    }).catch((err) => {
      setLoginStatus(err.response.data)
      //console.log(err.response.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:4200/api/auth/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(JSON.stringify(response.data.user.username));
      }
      
    })
  }, [])



  return (
    <div className="login_form">
      <img className="login_pic" src="https://picsum.photos/500/200/?random" alt="another random landscape" />
      <div>
        <h1>login</h1>
        <input className="form_tools" type='text' name='email' placeholder='email...' onChange={(e) => {setEmailLog(e.target.value)}}/>
        <input className="form_tools" type='text' name='password' placeholder='password...' onChange={(e) => {setPasswordLog(e.target.value)}}/>
        <button onClick={loginin}>Login</button>
      </div>
      <h1>{JSON.stringify(loginStatus)}</h1>
      <p>{Cookies.get('userId')}</p>
    </div>
  )
}






export default LoginForm;




// maximus200@email.com
// azerty