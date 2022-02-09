import '../../styles/Message.css'
import React from 'react';



class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: null, messageid: props.messageid, items: [] };
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
            <p className="comment_username">{item.User.username}</p>
            <p>{item.content}</p>
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
