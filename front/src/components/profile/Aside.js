import '../../css/style.css';
import React from 'react';
import GetUser from './GetUser';

const Aside = (props) => {
  const className = props.className 
  return (
    <div className={className}>
      <h2>mon Profil</h2>
      <form action="http://localhost:3000/profile">
        <input className="form_tool" type="submit" value="Modifier" />
      </form>
      <img class="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
      <GetUser />
    </div>
  )
}



export default Aside;
