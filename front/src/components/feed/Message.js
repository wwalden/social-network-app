import '../../css/style.css';
import React from 'react';



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
      {items.map(item => (
        <div className="messages" key={item.id}>
          <div className="messages_top">
            <h3>from {item.User.username}</h3>
            <p>message numéro {item.id}:</p>
            <p>{item.content}</p>
          </div>
          <div className="message_bottom">
            <p>comments</p>
            <p>likes</p>
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
