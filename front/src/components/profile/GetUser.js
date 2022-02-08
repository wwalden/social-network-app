import '../../css/style.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GetUser = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setuserData] = useState([]);

  const jwtcookie = Cookies.get('jwt');
  
  useEffect(() => {
    axios.get("http://localhost:4200/api/auth/19", {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    }).then((result) => {
          setIsLoaded(true);
          setuserData(result.data)
        },
        (error) => {
          setIsLoaded(true);
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    
    
    // const memberSinceFormated = memberSince.substring(0,10);

    return (
      <div className="aside_content">
        <p>{userData.email}</p>
        <p><b>@{userData.name}</b></p>
        <p className="aside_bio">{userData.bio}</p>
        <p className="aside_date">Membre depuis le {userData.createdAt}</p>
      </div>
    );
  }
}


export default GetUser;





/*
WORKING TOKEN
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpYXQiOjE2NDQzNDIxNTAsImV4cCI6MTczMDc0MjE1MH0.RuRc2f03F4O0ZOxhEpIs2udHrZs6HG5_uqmk2LkuFPs
*/