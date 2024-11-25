import React from "react";
import {Link} from 'react-router-dom';
import "./Login.scss"

const Login = () => {
  return (
    <div className="auth">
      <h1>Login</h1>
      <form className="auth__form">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Login</button>
        <span>Create an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
