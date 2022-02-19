import React, { useState, useEffect } from 'react';
import {checkUser} from '../../utils/checkUser'
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
require("dayjs/locale/fr");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);


const Comment = (props) => {
  const messageid = props.messageid;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [trashStatus, setTrashStatus] = useState("");
  const [commIsPosted, setCommIsPosted] = useState('');
  const [inputValue, setInputValue] = useState();
  const [postMess, setPostMess] = useState('');

  const jwtcookie = Cookies.get('jwt');
  axios.defaults.withCredentials = true;

  const deleteComment = async (commentid) => {
    const response = await axios.delete(`http://localhost:4200/api/mess/${messageid}/comment/${commentid}`, {
      headers: {
        "x-access-token": `${jwtcookie}`
      }
    });
    if (response.status === 200) {
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
      if (response.data.Comment) {
        setCommIsPosted(response.data.Comment)
        setInputValue("")
        setInputValue()
      }
    }).catch((err) => {
      setCommIsPosted("")
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      posting()
    }
  }

  let isAdminData = localStorage.getItem("isAdmin");
  let UserIsAdmin = (isAdminData === "Admin" ? "Admin" : "Standard");
  const checkAdminStatus = (item) => {
    if (UserIsAdmin === "Admin") {
      return <button aria-label="Delete-Comment" title="Delete-Comment" onClick={() => deleteComment(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>
    } else {
      return Number(checkUser()) === item.UserId && <button aria-label="Delete-Comment" title="Delete-Comment" onClick={() => deleteComment(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>
    }
  }

  useEffect (() => {
    const jwtcookie = Cookies.get('jwt');
    axios.get(`http://localhost:4200/api/mess/${messageid}/comment`, {
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
  }, [trashStatus, commIsPosted]) // eslint-disable-line react-hooks/exhaustive-deps


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="post_comment">
            <input className="comment_box" type='text' id={"postcomment" + messageid} value={inputValue} name='message' placeholder='ajoutez un commentaire!' onKeyDown={handleKeyDown} onChange={(e) => {setPostMess(e.target.value)}}/>
            <label htmlFor={"postcomment" + messageid}>
              <button aria-label="Post-Comment" title="Post-Comment" onClick={posting}><i className="fas fa-comments"></i>commentez!</button>
            </label>
        </div>
        <div className="message_comment">
          {items.map(item => (
            <div className="message_commment_line" key={item.id}>
              <div className="comment_top">
                <p className="comment_username"><i className="far fa-user-circle"></i>{item.User.username}</p>
                {checkAdminStatus(item)}
            </div>
                <p className="comment_date">{dayjs(item.User.createdAt).locale("fr").fromNow()}</p>
                <p className="comment_content"><i className="far fa-comment-dots"></i>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;

