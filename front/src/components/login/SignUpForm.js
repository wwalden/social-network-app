import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [emailLog, setEmailLog] = useState('');
  const [usernameLog, setUsernameLog] = useState('');
  const [passwordLog, setPasswordLog] = useState(''); 
  const [confirmPasswordLog, setConfirmPasswordLog] = useState(''); 
  const [bioLog, setBioLog] = useState('');

  axios.defaults.withCredentials = true;

  let usernameErrorMessage = "";
  let emailErrorMessage = "";
  let passwordErrorMessage = "";
  let confirmPasswordErrorMessage = "";
  let bioErrorMessage = "";

  //eslint-disable-next-line
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //regex password: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char
  const PASSWORD_REGEX  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  
  if (usernameLog.length >= 17 || usernameLog.length <= 5) {
    usernameErrorMessage = "! 6 à 16 caractères"
  }

  if (!EMAIL_REGEX.test(emailLog)) {
    emailErrorMessage = "email non valide"
  }

  if (!PASSWORD_REGEX.test(passwordLog)) {
    passwordErrorMessage = "mot de passe non valide"
  }

  if (passwordLog !== confirmPasswordLog) {
    confirmPasswordErrorMessage = "doit être identique"

  }

  const noError = usernameErrorMessage === "" && emailErrorMessage === "" && passwordErrorMessage === "" && confirmPasswordErrorMessage === "" && bioErrorMessage === "";

  const signup = () => {

    if (!noError) {
      return window.alert("Veuillez corriger le formulaire!")
    }

    axios.post("http://localhost:4200/api/auth/signup", {
      email: emailLog,
      username: usernameLog,
      password: passwordLog,
      bio: bioLog
    }).then((response) => { 
      if (response.status === 201) {
        window.alert("utilisateur créé!")
        window.location.href = "http://localhost:3000/login";
      } else {
        window.alert("erreur, veuillez réessayer");
      }
    }).catch((err) => {
      console.log(err.response.data)
    })
  }


  return (
    <div className="signup_page">
      <h2>Créer un compte</h2>
      <div className="signup_form">
        <div className="flex_start">
          <label htmlFor="username">Nom d'utilisateur:</label>
          <div>
            <input className="signup_field" type='username' id="username" name='username' placeholder='username...' onChange={(e) => {setUsernameLog(e.target.value)}}/>
            <p>{usernameErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start">
          <label htmlFor="email">Email:</label>
          <div>
            <input className="signup_field" id="email" type='email' name='email' placeholder='email...' onChange={(e) => {setEmailLog(e.target.value)}}/>
            <p>{emailErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start">
          <div className="flex_center_aligned">
            <label htmlFor="password" className="black">Mot de passe:</label>
            <p className="black small">(au moins 8 caractères, majuscules/minuscules, un chiffre, un caractère spécial)</p>
          </div>
          <div>
            <input className="signup_field" id= "password" type='password' name='password' placeholder='password...' onChange={(e) => {setPasswordLog(e.target.value)}}/>
            <p>{passwordErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start">
          <label htmlFor="passconfirm">Confirmez le mot de passe:</label>
          <div>
            <input className="signup_field" type='password' id="passconfirm" name='password' placeholder='password...' onChange={(e) => {setConfirmPasswordLog(e.target.value)}}/>
            <p>{confirmPasswordErrorMessage}</p>
          </div>
        </div>
 
        <div className="flex_center flex_start">
          <label htmlFor="bio">Entrez votre bio:</label>
          <div>
            <textarea className="signup_field" name='bio' id="bio" placeholder='bio...' rows="5" onChange={(e) => {setBioLog(e.target.value)}}/>
            <p>{bioErrorMessage}</p>
          </div>

        </div>

        <button onClick={signup}>S'inscrire</button>      
      </div>   
    </div>
  )
}


export default SignUpForm;