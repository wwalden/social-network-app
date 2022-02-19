import '../styles/Signup.css';
import React from 'react';
import Banner from '../components/banner/Banner';
import SignUpForm from '../components/login/SignUpForm'

const Signup = () => {
  return (
    <div>
      <Banner />
      <div id="transition"></div>
      < SignUpForm />
    </div>
  )
}

export default Signup;