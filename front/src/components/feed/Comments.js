import '../../styles/Message.css'
import React, { useState, useEffect } from 'react';
import {checkUser} from '../../utils/checkUser'
import axios from 'axios';



const Comment = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const messageid = props.messageid;
  const userid = props.userid;

  axios.defaults.withCredentials = true;
  useEffect (() => {
    axios.get(`http://localhost:4200/api/mess/${messageid}/comment`)
    .then(
      (result) => {
        //console.log(result.data)
        setIsLoaded(true);
        setItems(result.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  })

  const deleteComment = async (commentid) => {
    const response = await axios.delete(`http://localhost:4200/api/mess/${messageid}/comment/${commentid}`, {
      //headers: {
        //"x-access-token": `${jwtcookie}`
      //}
    });
    
    if (response.status === 200) {
      console.log("ok!")
      //document.location.reload()
    } else {
      console.log(commentid)
    }
  }



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <div>
      {items.map(item => (
        <div className="message_commment_line" key={item.id}>
          <div className="comment_top">
            <p className="comment_username"><i className="far fa-user-circle"></i>{item.User.username}</p>
            {checkUser() == userid && <button onClick={() => deleteComment(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>}
          </div>
            <p className="comment_date">{item.User.createdAt}</p>
            <p className="comment_content"><i className="far fa-comment-dots"></i>{item.content}</p>
        </div>
      ))}
    </div>
    );
  }
}


export default Comment;

