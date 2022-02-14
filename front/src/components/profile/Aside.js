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

  const deleteUser = async () => {
    const response = await axios.delete(`http://localhost:4200/api/auth/${checkUser()}`, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    });
    
    if (response.status === 200) {
      //console.log(messid)
      window.alert("utilisateur supprimé!")
      Cookies.remove('jwt');
      Cookies.remove('userId')
      document.location.reload()
    } else {
      console.log("erreur")
    }
  }



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
    <div className={className}>
      <h2>mon Profil</h2>
        <button className="form_tool" type="submit" onClick={deleteUser}>Supprimer</button>
      <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
      <GetUser fullData= {true}/>
    </div>
    )
  }
}



export default Aside;
