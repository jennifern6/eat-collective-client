import { Link, useNavigate } from 'react-router-dom';
import "./Register.scss";
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, inputs, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {

      setError(err.response?.data || "An unexpected error occurred");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form className="auth__form">
        <input required type="text" placeholder="username" name="username" onChange={handleChange} />
        <input required type="email" placeholder="email" name="email" onChange={handleChange} />
        <input required type="password" placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
