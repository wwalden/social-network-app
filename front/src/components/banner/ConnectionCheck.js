import '../../styles/Banner.css'
import React from 'react';

// se met sur 2 lignes si je mets "Connecté en tant que" ...

const ConnectionCheck = (props) => {
  const name = props.name
  return (
    <div className="groupo_check">
      <a href="http://localhost:3000/login">Connecté en tant que @{name}</a>
    </div>
  )
}


export default ConnectionCheck;
