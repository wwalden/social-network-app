import '../../styles/Message.css'
import React, { useState, useEffect } from 'react';
import {checkUser} from '../../utils/checkUser'
import axios from 'axios';
import Cookies from 'js-cookie';



const Comment = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const messageid = props.messageid;
  const userid = props.userid;

  axios.defaults.withCredentials = true;


  const [trashStatus, setTrashStatus] = useState("");
  const [commIsPosted, setCommIsPosted] = useState('');
  const [postMess, setPostMess] = useState(''); //useLess right??

  const jwtcookie = Cookies.get('jwt');



  const deleteComment = async (commentid) => {
    const response = await axios.delete(`http://localhost:4200/api/mess/${messageid}/comment/${commentid}`, {
      //headers: {
        //"x-access-token": `${jwtcookie}`
      //}
    });
    
    if (response.status === 200) {
      //console.log("ok!")
      //document.location.reload()
      setTrashStatus(commentid)
    } else {
      console.log(commentid)
    }
  }



  const posting = () => {
    axios.post(`http://localhost:4200/api/mess/${messageid}/comment`, {
      content: postMess,
    }, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    }).then((response) => { 
      //console.log(response)
      if (response.data.Comment) {
        setCommIsPosted(response.data.Comment) 
      }
    }).catch((err) => {
      setCommIsPosted("")
    })
  }


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
  }, [trashStatus, commIsPosted])






  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
<div>
      <div className="post_comment">
      <input className="comment_box" type='text' name='message' placeholder='ajoutez un commentaire!' onChange={(e) => {setPostMess(e.target.value)}}/>
      <button onClick={posting}><i className="fas fa-comments"></i></button>
      <p><i className="fas fa-thumbs-up"></i></p>
  </div>




    <div className="message_comment">
      {items.map(item => (
        <div className="message_commment_line" key={item.id}>
          <div className="comment_top">
            <p className="comment_username"><i className="far fa-user-circle"></i>{item.User.username}</p>
            {checkUser() == item.UserId && <button onClick={() => deleteComment(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>}
          </div>
            <p className="comment_date">{item.User.createdAt}</p>
            <p className="comment_content"><i className="far fa-comment-dots"></i>{item.content}</p>
        </div>
      ))}
    </div>

    </div>
    );
  }
}


export default Comment;

