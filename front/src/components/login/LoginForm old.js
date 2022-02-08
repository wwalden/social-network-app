
import React from 'react';
import Cookie from './Cookie';
import SendData from './SendData';

const LoginForm = () => {
  return (
    <div className="login_form">
      <img className="login_pic" src="https://picsum.photos/500/200/?random" alt="another random landscape" />
      <form>
      <div className="flex_center">
          <input className="form_tools" type='text' name='username' placeholder='username'/>
          <input className="form_tools" type='text' name='password' placeholder='password'/>
        </div>
        <div className="flex_center">
          <SendData/>
        </div>
        <div>
          <Cookie/>
        </div>
      </form>
    </div>
  )
}






export default LoginForm;
