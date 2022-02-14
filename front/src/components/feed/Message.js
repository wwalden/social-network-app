import '../../styles/Message.css' // USELESS !!
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Comment from './Comments';
import {checkUser} from '../../utils/checkUser'



const Message = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  axios.defaults.withCredentials = true;



  const jwtcookie = Cookies.get('jwt');

// ${messid}
  const [trashStatus, setTrashStatus] = useState("");
  const DeleteMess = async (messid) => {
      const response = await axios.delete(`http://localhost:4200/api/mess/${messid}`, {
        headers: {
          "x-access-token": `${jwtcookie}`
        }
      });
      
      if (response.status === 200) {
        //console.log(messid)
        setTrashStatus(messid)
        //document.location.reload()
      } else {
        console.log(messid)
      }





      /*
      
      
      then((response) => { 
        if (response.status === 200) {
          console.log("ok!")
          //document.location.reload()
        } else {
          console.log("error")
        }
      }).catch((err) => {
        console.log("error")
      })
      */
    }

   

    const [postMess, setPostMess] = useState('');
    const [messIsPosted, setMessIsPosted] = useState('');
    const [inputValue, setInputValue] = useState();

    const Posting = async () => {
      const response = await axios.post("http://localhost:4200/api/mess/", {
        content: postMess,
      }, {
        headers: {
          "x-access-token": `${jwtcookie}`
        }
      })
      //.then((response) => { 
        //console.log(response.data)
        if (response) {
          console.log(response)
          setMessIsPosted(response.data.Message)
          setInputValue("")
          setInputValue()
          //setItems([...postMess])
        }
      //}
      //).catch((err) => {
        //setPostMess("")
      //})
    }
/*
    const [likeStatus, setLikeStatus] = useState("");
    useEffect (() => {
        const response = axios.get(`http://localhost:4200/api/mess/${messageid}/like`, {
          headers: {
            "x-access-token": `${jwtcookie}`
          }
        });
        
        if (response.status === 200) {
          console.log(response.data.message)
          setLikeStatus(response.data.message)
          //document.location.reload()
        } else {
          console.log("error")
        }
    }, [])
*/


    useEffect (() => {
      axios.get("http://localhost:4200/api/mess", {
        headers: {
          "x-access-token": `${jwtcookie}`
        }
      })
      .then(
        (result) => {
          console.log(result.data)
          console.log(result.data[2].Likes.length)
          setIsLoaded(true);
          setItems(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, [trashStatus, messIsPosted])

   

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="mess_container">
              <div className="post_messages">
        <div>
          <input className="text_box" type='text' value={inputValue} name='message' placeholder='ici votre message...' onChange={(e) => {setPostMess(e.target.value)}}/>
        </div>
        <div className="button_space">
          <button className="mess_button" onClick={Posting}>Envoyer... <i className="fas fa-paper-plane"></i></button>
        </div>
      </div>
        {items.map(item => (
          <div className="messages" key={item.id}>
            <div className="messages_top">
              <div className="messages_top_user">
                <p className="username"><i className="far fa-user-circle"></i>{item.User.username}</p>
                {checkUser() == item.userId && <button onClick={() => DeleteMess(item.id)} className="trash_button"><i className="fas fa-trash"></i></button>}
              </div>
              <p>{item.content}</p>
            </div>
            <Comment messageid={item.id} userid={item.userId} messagecontent={item.content} messagelikes={item.likes} likestatus={true}/>
          </div>
        ))}
      </div>
    );
  }
}

export default Message;
