// import React from "react";
import {Link} from 'react-router-dom';
import "./Register.scss"
import { useState } from 'react';

const Register = () => {

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  console.log(inputs)

  return (
    <div className="auth">
      <h1>Register</h1>
      <form className="auth__form">
        <input required type="text" placeholder="username" name="username" onChange={handleChange} />
        <input required type="email" placeholder="email" name="emaile" onChange={handleChange} />
        <input required type="password" placeholder="password" name="password" onChange={handleChange} />
        <button>Register</button>
        <p>This is an error!</p>
        <span>Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
