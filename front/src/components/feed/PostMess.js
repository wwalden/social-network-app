import '../../styles/Message.css'
import React, {useState} from 'react';
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
      console.log(response.data)
      if (response.data.userId > 0) {
        setPostMess("") 
      }
    }).catch((err) => {
      setPostMess("")
      //console.log(err.response.data)
    })
  }

  return (
      <div className="post_messages">
        <div className="messages_top">
          <input className="text_box" type='text' name='message' placeholder='ici votre message...' onChange={(e) => {setPostMess(e.target.value)}}/>
        </div>
        <div className="message_bottom">
        <button onClick={posting}>Envoyer</button>
          <div>
            <p>post</p>
          </div>
          <p>likes</p>
        </div>
      </div>
  )
}


export default PostMess;