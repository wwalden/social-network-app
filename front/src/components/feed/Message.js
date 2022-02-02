import React from 'react';
import GetMess from './GetMess';
import '../../styles/Message.css';



const Message = () => {
  return (
    <div id="mess_container">
      <div className="messages">
        <h3>Ceci est un Message</h3>
        <GetMess />
      </div>
      <div className="messages">
        <h3>Ceci est un Message</h3>
        <p>vgubj yuvbuy bchgbu cbu iugbuc hbuc cuhr cuzev czeuvbc ezze cezrbuycbuikhoi cziuhgbtv</p>
      </div>
      <div className="messages">
        <h3>Ceci est un Message</h3>
        <p>vgubj yuvbuy bchgbu cbu iugbuc hbuc cuhr cuzev czeuvbc ezze cezrbuycbuikhoi cziuhgbtv</p>
      </div>
    </div>
  )
}




export default Message;