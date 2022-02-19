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
  let emailErrorMessage = "";
  let passwordErrorMessage = "";
  let confirmPasswordErrorMessage = "";
  let bioErrorMessage = "";

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

  const noError = usernameErrorMessage == "" && emailErrorMessage == "" && passwordErrorMessage == "" && confirmPasswordErrorMessage == "" && bioErrorMessage == "";
  //console.log(noError);

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
      //console.log(response.data.userId)
      if (response.status === 201) {
        window.alert("utilisateur créé!")
        setSignupStatus(true)
        window.location.href = "http://localhost:3000/login";
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
        <div className="flex_start">
          <p>Nom d'utilisateur:</p>
          <div>
            <input className="signup_field" type='username' name='username' placeholder='username...' onChange={(e) => {setUsernameLog(e.target.value)}}/>
            <p>{usernameErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start">
          <p>Email:</p>
          <div>
            <input className="signup_field" type='email' name='email' placeholder='email...' onChange={(e) => {setEmailLog(e.target.value)}}/>
            <p>{emailErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start">
          <div className="flex_center_aligned">
            <p className="black">Mot de passe:</p>
            <p className="black small">(au moins 8 caractères, majuscules/minuscules, un chiffre, un caractère spécial)</p>
          </div>
          <div>
            <input className="signup_field" type='password' name='password' placeholder='password...' onChange={(e) => {setPasswordLog(e.target.value)}}/>
            <p>{passwordErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start">
          <p>Confirmez le mot de passe:</p>
          <div>
            <input className="signup_field" type='password' name='password' placeholder='password...' onChange={(e) => {setConfirmPasswordLog(e.target.value)}}/>
            <p>{confirmPasswordErrorMessage}</p>
          </div>
        </div>
 
        <div className="flex_center flex_start">
          <p>Entrez votre bio:</p>
          <div>
            <textarea className="signup_field" name='bio' placeholder='bio...' rows="5" onChange={(e) => {setBioLog(e.target.value)}}/>
            <p>{bioErrorMessage}</p>
          </div>

        </div>

        <button onClick={signup}>S'inscrire</button>      
      </div>   
    </div>
  )
}


export default SignUpForm;