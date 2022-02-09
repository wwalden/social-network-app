import '../../styles/Aside.css'
import React from 'react';
import axios from 'axios';


class GetUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: null, userData: null };
  }

  componentDidMount() {
    axios.get("http://localhost:4200/api/auth/19")
      .then((res) => {
        console.log(res)
        res.json()
      })
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
    const name = isLoaded ? 'Loading...' : this.state.userData.username;
    const email = isLoaded ? 'Loading...' : this.state.userData.email;
    const bio = isLoaded ? 'Loading...' : this.state.userData.bio;

    const memberSince = isLoaded ? 'Loading...' : this.state.userData.createdAt;
    const memberSinceFormated = memberSince.substring(0,10);

    return (
      <div className="aside_content">
        <p>{email}</p>
        <p><b>@{name}</b></p>
        <p className="aside_bio">{bio}</p>
        <p className="aside_date">Membre depuis le {memberSinceFormated}</p>
      </div>

    );
  }
}


export default GetUser;




