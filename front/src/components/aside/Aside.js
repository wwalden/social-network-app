import React from 'react';
import '../../styles/Aside.css';
import GetUser from './GetUser';

const Aside = () => {
  return (
    <div id="groupo_aside">
      <h2>mon Profil</h2>
      <img class="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
      <p><GetUser /></p>
      <p><b>Arnaud</b></p>
      <p className="aside_bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p className="aside_date">Membre depuis le 22/05/2019</p>
    </div>
  )
}



export default Aside;
