import '../../styles/Aside.css'
import React from 'react';
import GetUser from './GetUser';
import {checkUser} from '../../utils/checkUser'
import axios from 'axios';
import Cookies from 'js-cookie';

const jwtcookie = Cookies.get('jwt');


const Aside = (props) => {
  const className = props.className
  const fullData = props.fullData





  if (!fullData) {
    return (
      <div className={className}>
        <h2>mon Profil</h2>
        <form action="http://localhost:3000/profile">
          <input className="form_tool" type="submit" value="Modifier" />
        </form>
        <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
        <GetUser fullData= {true}/>
      </div>
    )
  } else {
    return (
      <GetUser fullData= {true}/>
    )
  }
}



export default Aside;
