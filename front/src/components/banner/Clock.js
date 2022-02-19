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
        <h1>Bienvenue sur <span className="styled_font">  in'Touch  </span> by Groupomania!</h1>
        <p>Nous sommes <span className="colored_font">{this.state.date.toLocaleDateString('fr-FR', dayDisplay)}</span>, il est {this.state.date.toLocaleTimeString('fr-FR', timeDisplay)}</p>
      </div>
    );
  }
  componentDidMount() {
    const refreshDuration = 1000;
    setInterval(() => {
      this.setState({ date: new Date() });
    }, refreshDuration);
  }
}


export default Clock;
