import React from 'react';

const LoginForm = () => {
  return (
    <div className="login_form">
      <img class="login_pic" src="https://picsum.photos/500/200/?random" alt="another random landscape" />
      <form>
      <div className="flex_center">
          <input className="form_tools" type='text' name='username' placeholder='username'/>
          <input className="form_tools" type='text' name='password' placeholder='password'/>
        </div>
        <div className="flex_center">
          <button className="form_tools" type='submit'>Connexion</button>
          <button className="form_tools" type='submit'>Inscription</button>
        </div>
      </form>
    </div>
  )
}



export default LoginForm;
