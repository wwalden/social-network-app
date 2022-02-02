import React from 'react';


class GetMess extends React.Component {
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
    //const isLoaded = this.state.items === null ? true : false;
    //const name = isLoaded ? 'Loading...' : this.state.messData.id;

    return (
      <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.content}
        </li>
      ))}
      </ul>
    );
  }
}


export default GetMess;







/*
return (
  <ul>
  {items.map(item => (
    <li key={item.id}>
      {item.content}
    </li>
  ))}
  </ul>
);
*/






