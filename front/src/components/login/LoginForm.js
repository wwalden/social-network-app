import '../../css/style.css';
import React, { useState } from 'react';
import axios from 'axios';



const LoginForm = () => {

  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

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
    </div>
  )
}






export default LoginForm;




// maximus200@email.com
// azerty