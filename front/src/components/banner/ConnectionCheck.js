import '../../styles/Banner.css'
import React from 'react';
import GetUser from '../profile/GetUser';

// se met sur 2 lignes si je mets "Connecté en tant que" ...

const ConnectionCheck = (props) => {
  const name = props.name
  return (
    <div className="groupo_check">
      <a href="http://localhost:3000/login"></a><GetUser fullData={false}/>
    </div>
  )
}


export default ConnectionCheck;
