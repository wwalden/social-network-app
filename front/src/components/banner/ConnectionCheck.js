import React from 'react';
import '../../styles/Banner.css';
import GetUser from '../aside/GetUser';



const ConnectionCheck = (props) => {
  const name = props.name
  return (
    <div className="groupo_check">
      <a href="http://localhost:3000/login"><p>connecté en tant que {name}</p></a>
    </div>
  )
}


export default ConnectionCheck;
