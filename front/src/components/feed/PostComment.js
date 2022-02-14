import '../../styles/Message.css'
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

 


const PostComment = (props) => {

  const messageid = props.messageid
  const [postMess, setPostMess] = useState('');
  const [commIsPosted, setCommIsPosted] = useState('');

  const jwtcookie = Cookies.get('jwt');
  axios.defaults.withCredentials = true;

  const posting = () => {
    axios.post(`http://localhost:4200/api/mess/${messageid}/comment`, {
      content: postMess,
    }, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    }).then((response) => { 
      //console.log(response.data)
      if (response.Comment) {
        setCommIsPosted(response.Comment) 
      }
    }).catch((err) => {
      setPostMess("")
    })
  }



  return (
    <div className="post_comment">
      <input className="comment_box" type='text' name='message' placeholder='ajoutez un commentaire!' onChange={(e) => {setPostMess(e.target.value)}}/>
      <button onClick={posting}><i className="fas fa-comments"></i></button>
      <p><i className="fas fa-thumbs-up"></i></p>
  </div>
  )
}


export default PostComment;