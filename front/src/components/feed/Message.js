import '../../styles/Message.css'
import React from 'react';
import Comment from './Comments';
import PostMess from './PostMess';
import PostComment from './PostComment';



class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: null, items: [] };
  }

  componentDidMount() {
    fetch("http://localhost:4200/api/mess")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const items = this.state.items;
    return (
    <div id="mess_container">
       
          <PostMess/>
      
      {items.map(item => (
        <div className="messages" key={item.id}>
          <div className="messages_top">
            <p className="username">{item.User.username}</p>
            <p>{item.content}</p>
          </div>
          <PostComment/>

          <div className="message_comment">
              <Comment messageid={item.id} />
            </div>
        </div>
      ))}
    </div>
    );
  }
}


export default Message;




//error non gêré
//const isLoaded = this.state.items === null ? true : false;
//const name = isLoaded ? 'Loading...' : this.state.messData.id;
