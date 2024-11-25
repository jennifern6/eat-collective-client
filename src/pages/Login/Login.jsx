import React from "react";
import "./Login.scss"

function Login() {
  return (
    <div className="auth">
      <h1>Login</h1>
      <form className="auth__form">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
