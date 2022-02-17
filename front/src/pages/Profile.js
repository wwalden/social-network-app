import '../styles/Profile.css';
import React from 'react';
import Banner from '../components/banner/Banner'
import Aside from '../components/profile/Aside'
import axios from 'axios';
import {checkUser} from '../utils/checkUser'
import Cookies from 'js-cookie';

const jwtcookie = Cookies.get('jwt');


const Profile = () => {


  const deleteUser = async () => {
    const response = await axios.put(`http://localhost:4200/api/auth/${checkUser()}`, {
      bio: "",
    },{
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
      console.log(response)
      return response.error;
    }
  }





  return (
    <div>
      <Banner />
      <div id="transition"></div>
      <div className="center">
        <div className="profile_main">
          <h2>mon Profil</h2>
          <button className="form_tool" type="submit" onClick={deleteUser}>Supprimer</button>
          <button className="form_tool" type="submit" >Modifier</button>
          <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
          <Aside fullData={true}/>
        </div>
      </div>
    </div>
  )
}


export default Profile;