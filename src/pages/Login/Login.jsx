import React from "react";

function Login() {
  return (
    <div classNamw="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
