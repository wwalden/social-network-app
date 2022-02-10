import '../../styles/Message.css'
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

 
const PostMess = () => {
  const [postMess, setPostMess] = useState('');

  const jwtcookie = Cookies.get('jwt');
  axios.defaults.withCredentials = true;
  const posting = () => {
    axios.post("http://localhost:4200/api/mess/", {
      content: postMess,
    }, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    }).then((response) => { 
      //console.log(response.data)
      if (response.data.userId > 0) {
        setPostMess("") 
      }
    }).catch((err) => {
      setPostMess("")
    })
  }


  return (
      <div className="post_messages">
        <div>
          <input className="text_box" type='text' name='message' placeholder='ici votre message...' onChange={(e) => {setPostMess(e.target.value)}}/>
        </div>
        <div className="button_space">
          <button className="mess_button" onClick={posting}>Envoyer... <i className="fas fa-paper-plane"></i></button>
        </div>
      </div>
  )
}


export default PostMess;