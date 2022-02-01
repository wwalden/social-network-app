import React from 'react';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    const dayDisplay = { weekday: 'long' };
    const timeDisplay = { hour: '2-digit', minute:'2-digit' };

    return (
      <div>
        <p>Bienvenue sur <span className="styled_font">  keep'in  </span> by Groupomania!</p>
        <p>Nous sommes {this.state.date.toLocaleDateString('fr-FR', dayDisplay)}, il est {this.state.date.toLocaleTimeString('fr-FR', timeDisplay)}</p>
      </div>
    );
  }
  componentDidMount() {
    const halfAMin = 30000;
    setInterval(() => {
      this.setState({ date: new Date() });
    }, halfAMin);
  }
}


export default Clock;