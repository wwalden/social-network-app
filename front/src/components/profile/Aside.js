import '../../styles/Aside.css'
import React from 'react';
import GetUser from './GetUser';



const Aside = (props) => {
  const className = props.className
  const fullData = props.fullData
  // nimp avec les props "Fulldata" qui sont 2 fois les mêmes: changer ça!"
  // renommer celle-ci, qui se déverse soit dans "Home" soit dans "Profile"


  if (!fullData) {
    return (
      <div className={className}>
        <h2>mon Profil</h2>
        <form action="http://localhost:3000/profile">
          <input className="form_tool" type="submit" value="Modifier" />
        </form>
        <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
        <GetUser fullData= "Full"/>
      </div>
    )
  } else {
    return (
      <GetUser fullData= "Full"/>
    )
  }
}



export default Aside;
