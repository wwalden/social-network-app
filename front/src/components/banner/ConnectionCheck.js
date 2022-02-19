import React from 'react';
import GetUser from '../profile/GetUser';

const ConnectionCheck = (props) => {
  const name = props.name
  return (
    <div className="groupo_check">
      <GetUser fullData="Small"/>
    </div>
  )
}

export default ConnectionCheck;
