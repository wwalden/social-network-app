import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Comment from './Comments';
import {checkUser} from '../../utils/checkUser';
import dayjs from 'dayjs';
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

 
const Message = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  axios.defaults.withCredentials = true;
  const jwtcookie = Cookies.get('jwt');
  const [trashStatus, setTrashStatus] = useState("");
  const DeleteMess = async (messid) => {
    const response = await axios.delete(`http://localhost:4200/api/mess/${messid}`, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    });
    if (response.status === 200) {
      setTrashStatus(messid)
    }
  }

  const [postMess, setPostMess] = useState('');
  const [messIsPosted, setMessIsPosted] = useState('');

  const Posting = async () => {
    if (postMess !== "") {
      const response = await axios.post("http://localhost:4200/api/mess/", {
        content: postMess,
      }, {
        headers: {
          "x-access-token": `${jwtcookie}`
        }
      })
      if (response) {
        setMessIsPosted(response.data.Message)
        setPostMess('')
      }
    }
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      Posting()
    }
  }

  const [likes, setLikes] = useState("");
  const LikeMess = async (messid) => {
      const response = await axios.post(`http://localhost:4200/api/mess/${messid}/like`, {
        content: "",
      }, {
        headers: {
          "x-access-token": `${jwtcookie}`
        }
      });
      
      if (response.status === 200) {
        setLikes(response.data.message)
      }
  }


  const checkLikeStatus = (likesArray, user) => {
    for (let i=0; i<likesArray.length; i++) {
      if(likesArray[i].userid === Number(user)) {
        return true;
      }
    }
    return false;
  }

  const checkAdminStatus = (item) => {
    if (UserIsAdmin === "Admin") {
      return <button aria-label="Delete-Message" title="Delete-Message" onClick={() => DeleteMess(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>
    } else {
      return Number(checkUser()) === item.userId && <button aria-label="Delete-Message" title="Delete-Message" onClick={() => DeleteMess(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>
    }
  }

  const shareContent = async (item) => {
    await navigator.clipboard.writeText(item);
    alert("message copié!")
  }


  useEffect (() => {
    const jwtcookie = Cookies.get('jwt');
    axios.get("http://localhost:4200/api/mess", {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    })
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [trashStatus, messIsPosted, likes]) // eslint-disable-line react-hooks/exhaustive-deps

  let isAdminData = localStorage.getItem("isAdmin");
  let UserIsAdmin = (isAdminData === "Admin" ? "Admin" : "Standard");

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="mess_container">
        <div className="post_messages">
          <div>
            <input className="text_box" type='text' id='postmess' value={postMess} name='message' placeholder='ici votre message...' onKeyDown={handleKeyDown} onChange={(e) => {setPostMess(e.target.value)}}/>
          </div>
          <div className="button_space">
            <label htmlFor='postmess'>
            <button className="mess_button" onClick={Posting}>Envoyer... <i className="fas fa-paper-plane"></i></button>
            </label>
          </div>
        </div>
        {items.map(item => (
          <article className="messages" key={item.id}>
            <div className="messages_top">
              <div className="messages_top_user">
                <div>
                <p className="username"><i className="far fa-user-circle"></i>{item.User.username}</p>
                <p className="username small_time">{dayjs(item.createdAt).locale("fr").fromNow()}</p>
                </div>
                {checkAdminStatus(item)}
              </div>
              <p>{item.content}</p>
            </div>

             {checkLikeStatus(item.Likes, checkUser()) && <div className="flex">
              <button title="likez!" onClick={() => LikeMess(item.id)}><i className="fas fa-thumbs-up green"></i></button>
              <p className="green">{item.likes}</p>
              <button title="copiez le texte et partagez-le!" onClick={() => {shareContent(item.content)}}><i className="fas fa-share"></i></button>
            </div>}

            {!checkLikeStatus(item.Likes, checkUser()) && <div className="flex">
              <button title="likez!" onClick={() => LikeMess(item.id)}><i className="fas fa-thumbs-up red"></i></button>
              <p className="red">{item.likes}</p>
              <button title="copiez le texte et partagez-le!" onClick={() => {shareContent(item.content)}}><i className="fas fa-share"></i></button>
            </div> }

            <Comment messageid={item.id} />
          </article>
        ))}
      </div>
    );
  }
}

export default Message;
