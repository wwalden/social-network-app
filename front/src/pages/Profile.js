import '../styles/Profile.css';
import React, {useState} from 'react';
import Banner from '../components/banner/Banner'
import Aside from '../components/profile/Aside'
import axios from 'axios';
import {checkUser} from '../utils/checkUser'
import Cookies from 'js-cookie';
import ProfileUpdate from '../components/profile/ProfileUpdate';
import GetUser from '../components/profile/GetUser';

const jwtcookie = Cookies.get('jwt');


const Profile = () => {

  const [pageType, setPageType] = useState(false);

  const allowChange = () => {
    setPageType(true)

  }


  const deleteUser = async () => {
    let answer = window.confirm("Confirmez-vous la suppression de votre compte? Cette opération est irréversible");
    if (answer) {
      const response = await axios.delete(`http://localhost:4200/api/auth/${checkUser()}`,{
        headers: {
          "x-access-token": `${jwtcookie}`
        }
      });
      
      if (response.status === 200) {
        window.alert("utilisateur supprimé!")
        Cookies.remove('jwt');
        Cookies.remove('userId')
        document.location.reload()
      } else {
        console.log(response)
        return response.error;
      }
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
            <button className="form_tool" type="submit" onClick={allowChange}>Modifier</button>
            {pageType &&
              <div>
                <p>ici le formulaire de changement</p>
                < ProfileUpdate />
              </div>
            }
            {!pageType &&
              <div>
                <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
                <Aside fullData={true} />
              </div>
            }
          </div>
        </div>
      </div>
    )
}


export default Profile;