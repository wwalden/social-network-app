import '../../styles/Aside.css'
import React from 'react';
import GetUser from './GetUser';



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
        <div className="flex_center_aside">
          <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
          <GetUser fullData= "Full"/>
        </div>
      </div>
    )
  } else {
    return (
      <GetUser fullData= "Full"/>
    )
  }
}



export default Aside;
