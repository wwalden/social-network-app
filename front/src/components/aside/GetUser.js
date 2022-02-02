import React from 'react';


class GetUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: null, userData: null };
  }

  componentDidMount() {
    fetch("http://localhost:4200/api/auth/19")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userData: result
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
    const isLoaded = this.state.userData === null ? true : false;
    let name = isLoaded ? 'Loading...' : this.state.userData.username;

    return (
          <p>@{name}</p>
    );
  }
}


export default GetUser;




