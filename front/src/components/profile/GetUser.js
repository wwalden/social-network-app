import '../../styles/Aside.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {checkUser} from '../../utils/checkUser'

 
const GetUser = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setuserData] = useState([]);

  const fullData = props.fullData;
  const classprops = props.classprops



  useEffect(() => {
    const jwtcookie = Cookies.get('jwt');
    axios.get(`http://localhost:4200/api/auth/${checkUser()}`, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    }).then((result) => {
          setIsLoaded(true);
          setuserData(result.data)
          localStorage.setItem("isAdmin", result.data.isAdmin);
        },
        (error) => {
          setIsLoaded(true);
          setError(error)
        }
      ).catch((error) => (console.log(error)))
  }, [])

  if (error) {
    return <div>non connecté</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (fullData === "Full") {
      return (
        <div className="aside_content">
          <p>{userData.email}</p>
          <p><b>@{userData.username}</b></p>
          <p className="aside_bio">Bio: {userData.bio}</p>
          <p className="aside_date">Membre depuis le {userData.createdAt}</p>
        </div>
      );
    } else if (fullData === "Small"){
      return <p>connecté en tant que: {userData.username}</p>
    } else if (fullData === "Light") {
      return (
        <div className={classprops}>
          <p>votre email actuel: {userData.email}</p>
          <p>votre nom d'utilisateur actuel: "{userData.username}"</p>
          <p>votre bio actuelle: "{userData.bio}"</p>
        </div>
      );
    }
  }
}

export default GetUser;

