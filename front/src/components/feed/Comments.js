import '../../styles/Message.css'
import React from 'react';
import {checkUser} from '../../utils/checkUser'



class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: null, messageid: props.messageid, userid: props.userid, items: [] };
  }


  componentDidMount() {
    fetch(`http://localhost:4200/api/mess/${this.state.messageid}/comment`)
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
    <div>
      {items.map(item => (
        <div className="message_commment_line" key={item.id}>
          <div className="comment_top">
            <p className="comment_username"><i className="far fa-user-circle"></i>{item.User.username}</p>
            {checkUser() == this.state.userid && <button className="trash_button"><i className="fas fa-trash"></i></button>}
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






//error non gêré
//const isLoaded = this.state.items === null ? true : false;
//const name = isLoaded ? 'Loading...' : this.state.messData.id;
