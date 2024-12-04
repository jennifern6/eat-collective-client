
import { Link, useNavigate } from 'react-router-dom';
import "./Login.scss"
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
        await login(inputs); // Try logging in
        navigate("/"); // Redirect to the home page on success
    } catch (err) {
        setError(err.response?.data); // Store the error response data

        // Handle 404 status specifically
        if (err.response?.status === 404) {
            alert("User not found! Please create an account."); // Show an alert
            navigate("/register"); // Redirect to the register page
        } else if (err.response?.status === 400) {
            alert("Wrong username or password!"); // Handle incorrect credentials
        } else {
            alert("An error occurred. Please try again later."); // Handle other errors
        }
    }
};


  return (
    <div className="auth">
      <h1>Login</h1>
      <form className="auth__form">
        <input 
        required 
        type="text" 
        placeholder="username" 
        name="username" 
        onChange={handleChange} />
       
        <input 
        required 
        type="password" 
        placeholder="password" 
        name="password" 
        onChange={handleChange} />
        
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Create an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;


