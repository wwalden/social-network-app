import '../../styles/Feed.css'
import './Feed';
import React from 'react';



class Trees extends React.Component {
  constructor(props) {
    super(props);
    this.state = { treeCount: 34598 };
  }

  render() {
    return (
      <div className="groupo_trees">
        <a href="http://localhost:3000/home"><p>🌲🌲 Groupomania soutient la planète en aidant <b>REFOREST'ACTION</b> à planter des arbres!
        Déjà <span className="tree_count">{this.state.treeCount}</span> arbres de plantés cette année! <br></br> cliquez ici pour en savoir plus! 🌲🌲</p></a>
      </div>
    );
  }
  componentDidMount() {
    const refreshDuration = 500;
    setInterval(() => {
      let randomNum = Math.floor(Math.random()*20)
      this.setState({ treeCount: this.state.treeCount + randomNum });
    }, refreshDuration);
  }
}


export default Trees;
