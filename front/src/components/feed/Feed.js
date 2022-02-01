import React from 'react';
import Message from './Message'
import '../../styles/Feed.css';

const Feed = () => {
  return (
    <div id="groupo_feed">
      <h2>Fil d'<span className="styled_font">A</span>ctualités</h2>
      <Message />
    </div>
  )
}


export default Feed;