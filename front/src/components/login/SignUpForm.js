import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Signup.css';


const SignUpForm = () => {

  const [emailLog, setEmailLog] = useState('');
  const [usernameLog, setUsernameLog] = useState('');
  const [passwordLog, setPasswordLog] = useState(''); 
  const [confirmPasswordLog, setConfirmPasswordLog] = useState(''); 
  const [bioLog, setBioLog] = useState('');

  const [signupStatus, setSignupStatus] = useState(false);
  axios.defaults.withCredentials = true;

  let usernameErrorMessage = "";

  if (usernameLog.length < 3) {
    usernameErrorMessage = "nom d'utilisateur trop court"
  }


  const signup = () => {
    axios.post("http://localhost:4200/api/auth/signup", {
      email: emailLog,
      password: passwordLog,
    }).then((response) => { 
      //console.log(response.data.userId)
      if (response.data.auth) {
        setSignupStatus(true)
      } else {
        setSignupStatus(false)
      }
    }).catch((err) => {
      setSignupStatus(false)
      //console.log(err.response.data)
    })
  }


  return (
    <div className="signup_page">
      <h1>Créer un compte</h1>
      <div className="signup_form">
        <div className="flex_center">
          <p>Nom d'utilisateur:</p>
          <div>
            <input className="signup_field" type='username' name='username' placeholder='username...' onChange={(e) => {setUsernameLog(e.target.value)}}/>
            <p>{usernameErrorMessage}</p>
          </div>
        </div>

        <div className="flex_center">
          <p>Email:</p>
          <input className="signup_field" type='email' name='email' placeholder='email...' onChange={(e) => {setEmailLog(e.target.value)}}/>
        </div>

        <div className="flex_center">
          <p>Mot de passe:</p>
          <input className="signup_field" type='password' name='password' placeholder='password...' onChange={(e) => {setPasswordLog(e.target.value)}}/>
        </div>

        <div className="flex_center">
          <p>Confirmez le mot de passe:</p>
          <input className="signup_field" type='password' name='password' placeholder='password...' onChange={(e) => {setConfirmPasswordLog(e.target.value)}}/>
        </div>

        <div className="flex_center flex_start">
          <p>Entrez votre bio:</p>
          <input className="signup_field field_bio" type='bio' name='bio' placeholder='bio...' onChange={(e) => {setBioLog(e.target.value)}}/>
        </div>

        <button onClick={signup}>S'inscrire</button>      
      </div>   
    </div>
  )
}


export default SignUpForm;