import '../../css/style.css';
import React from 'react';


class SendData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: null, items: [], logged: 'logged out' };
  }

  componentDidMount () {
    this.loginFunction();
  }


  loginFunction() {

    let options = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
          //"content" : "houhouhou"
          "email": "maximus200@email.com",
          "password": "azerty"
      })
  };
  //fetch("https://random-word-api.herokuapp.com/word?number=1")
   //fetch("http://localhost:4200/api/mess/14/comment", options)
   fetch("http://localhost:4200/api/auth/login", options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      }) 
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: JSON.stringify(result),
            logged: 'logged in',
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            logged: 'not really'
          });
        }
      )
  }


  render() {
    const items = this.state.items;
    return (
    <div>
      <button onClick={this.loginFunction}>connexion</button>
      <p>State: {this.state.logged}</p>
      <p>{items}</p>
    </div>
    )
  }
}


export default SendData;










/*

    const items = this.state.items;
 <div>
      <p>{items[0].content}</p>
      <p>{Cookies.get('jwt')}</p>
    </div>

//Origin, X-Requested-With, Content, Accept, Content-Type, Authorization
const sendData = () => {
 //Requête POST sur l'API
  alert("youhou")
  fetch("http://localhost:4200/api/mess/13/comment", {
    method: "GET",
    body: JSON.stringify({
      body: "salut salut salut"
    })
  })
  .then(res => console.log(res.json()))
  .catch(alert => console.log(alert));



  .then(function(res) {
    if (res.ok) {
      alert(res)
    }
    else {
      console.log ("error")
    }
  })
  .catch((error) =>  console.log(error));
  
   Récupérer la réponse, ouvrir une page 'confirmation' et insérer le numéro de commande dans l'URL
  .then(function(value) {
    window.open(`./confirmation.html?order=${value.orderId}`,"_self")
  });
}
*/


