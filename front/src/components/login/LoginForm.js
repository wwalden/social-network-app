import '../../styles/Login.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

 
const LoginForm = () => {

  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [loginStatus, setLoginStatus] = useState(false);
 
  axios.defaults.withCredentials = true;
  const loginin = () => {
    axios.post("http://localhost:4200/api/auth/login", {
      email: emailLog,
      password: passwordLog,
    }).then((response) => { 
      //console.log(response.data.userId)
      if (response.data.auth) {
        setLoginStatus(true)
        window.location.reload();
      } else {
        setLoginStatus(false)
      }
    }).catch((err) => {
      setLoginStatus(false)
      //console.log(err.response.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:4200/api/auth/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        //JSON.stringify(response.data.user.id));
      }
      
    })
  }, [])



  return (
    <div>
      <img className="login_pic" src="https://picsum.photos/478/200/?random" alt="another random landscape" />
      <div className="login_form">
        <h1>login</h1>
        <input className="form_tools" type='email' name='email' placeholder='email...' onChange={(e) => {setEmailLog(e.target.value)}}/>
        <input className="form_tools" type='password' name='password' placeholder='password...' onChange={(e) => {setPasswordLog(e.target.value)}}/>
        <button onClick={loginin}>Login</button>
      </div>
    </div>
  )
}






export default LoginForm;




// maximus200@email.com
// azerty