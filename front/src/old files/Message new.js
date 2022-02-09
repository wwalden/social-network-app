import '../../styles/Message.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comments';
import PostMess from './PostMess';



const Message = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect (() => {
    axios.get("http://localhost:4200/api/mess")
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
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
              <h3>from {item.User.username}</h3>
              <p>message numéro {item.id}:</p>
              <p>{item.content}</p>
            </div>
            <div className="message_bottom">
              <p>comments</p>
              <div>
                <Comment messageid={item.id} />
              </div>
              <p>likes</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Message;
