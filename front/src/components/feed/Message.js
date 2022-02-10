import '../../styles/Message.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comments';
import PostMess from './PostMess';
import PostComment from './PostComment';
import {checkUser} from '../../utils/checkUser'



const Message = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect (() => {
    axios.get("http://localhost:4200/api/mess")
    .then(
      (result) => {
        console.log(result.data)
        setIsLoaded(true);
        setItems(result.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])
  

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="mess_container">
        <PostMess/>
        {items.map(item => (
          <div className="messages" key={item.id}>
            <div className="messages_top">
              <div className="messages_top_user">
                <p className="username"><i className="far fa-user-circle"></i>{item.User.username}</p>
                {checkUser() == item.userId && <button className="trash_button"><i className="fas fa-trash"></i></button>}
              </div>
              <p>{item.content}</p>
            </div>
            <PostComment messageid={item.id}/>
            <div className="message_comment">
              <Comment messageid={item.id} userid={item.userId}/>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Message;
