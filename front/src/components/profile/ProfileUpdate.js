import React, { useState } from "react";
import axios from "axios";
import GetUser from "./GetUser";
import { checkUser } from "../../utils/checkUser";
import Cookies from "js-cookie";

const ProfileUpdate = () => {
  const [emailLog, setEmailLog] = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [confirmPasswordLog, setConfirmPasswordLog] = useState("");
  const [bioLog, setBioLog] = useState("");

  axios.defaults.withCredentials = true;

  const jwtcookie = Cookies.get("jwt");

  let usernameErrorMessage = "";
  let emailErrorMessage = "";
  let passwordErrorMessage = "";
  let confirmPasswordErrorMessage = "";
  let bioErrorMessage = "";

  //eslint-disable-next-line
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //regex password: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char
  const PASSWORD_REGEX  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  
  if ((usernameLog.length >= 17 || usernameLog.length <= 5) && usernameLog.length !== 0) {
    usernameErrorMessage = "! 6 à 16 car."
  }

  if (!EMAIL_REGEX.test(emailLog) && emailLog.length !== 0) {
    emailErrorMessage = "email non valide"
  }

  if (!PASSWORD_REGEX.test(passwordLog) && passwordLog.length !== 0) {
    passwordErrorMessage = "mot de passe non valide"
  }

  if (passwordLog !== confirmPasswordLog) {
    confirmPasswordErrorMessage = "doit être identique"

  }


  const noError =
    usernameErrorMessage === "" &&
    emailErrorMessage === "" &&
    passwordErrorMessage === "" &&
    confirmPasswordErrorMessage === "" &&
    bioErrorMessage === "";

  const updateprofile = () => {
    if (!noError) {
      return window.alert("Veuillez corriger le formulaire!");
    }

    axios
      .put(
        `http://localhost:4200/api/auth/${checkUser()}`,
        {
          email: emailLog,
          username: usernameLog,
          password: passwordLog,
          bio: bioLog,
        },
        {
          headers: {
            "x-access-token": `${jwtcookie}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          window.alert("modifications enregistrées!");
          window.location.href = "http://localhost:3000/profile";
        } else {
          window.alert("erreur, veuillez réessayer");
        }
      })
      .catch((err) => {
        console.log(err.response.data)
      });
  };

  return (
    <div className="full_width">
      <GetUser fullData="Light" classprops="profileupdate_current"/>
      <div className="profileupdate_form">
        <div className="flex_start_update">
          <p>Nouveau nom d'utilisateur:</p>
          <div>
            <input
              className="signup_field"
              type="username"
              name="username"
              placeholder="username..."
              onChange={(e) => {
                setUsernameLog(e.target.value);
              }}
            />
            <p className="small">{usernameErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start_update">
          <p>Nouvel email:</p>
          <div>
            <input
              className="signup_field"
              type="email"
              name="email"
              placeholder="email..."
              onChange={(e) => {
                setEmailLog(e.target.value);
              }}
            />
            <p className="small">{emailErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start_update">
          <div className="flex_center_password">
            <p className="margin_top">Nouveau Mot de passe:</p>
            <p className="black small">(+ de 8 car., maj et min, un chiffre + un car. spécial)</p>
          </div>
          <div>
            <input
              className="signup_field"
              type="password"
              name="password"
              placeholder="password..."
              onChange={(e) => {
                setPasswordLog(e.target.value);
              }}
            />
            <p className="small">{passwordErrorMessage}</p>
          </div>
        </div>

        <div className="flex_start_update">
          <p>Confirmez le nouveau mot de passe:</p>
          <div>
            <input
              className="signup_field"
              type="password"
              name="password"
              placeholder="password..."
              onChange={(e) => {
                setConfirmPasswordLog(e.target.value);
              }}
            />
            <p className="small">{confirmPasswordErrorMessage}</p>
          </div>
        </div>

        <div className="flex_center flex_start_update">
          <p>Modifiez votre bio:</p>
          <div>
            <textarea
              className="signup_field field_bio"
              rows= "5"
              name="bio"
              placeholder="bio..."
              autoFocus
              onChange={(e) => {
                setBioLog(e.target.value);
              }}
            />
            <p>{bioErrorMessage}</p>
          </div>
        </div>

        <button class="form_tool" onClick={updateprofile}>Soumettre</button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
