import { Link, useNavigate } from 'react-router-dom';
import "./Login.scss";
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext.jsx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs); // Attempt to log in
      navigate("/"); // Redirect to the home page on success
    } catch (error) {
      setError(error.response?.data || "An error occurred"); // Store error data or a fallback message

      // Handle specific error cases
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          alert("User not found! Please create an account.");
          navigate("/register"); // Redirect to register page
        } else if (status === 400) {
          alert("Wrong username or password!");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else {
        // Handle network or other unexpected errors
        alert("A network error occurred. Please check your connection.");
        console.error("Unexpected error:", error); // Debugging
      }
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span>
          Create an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
