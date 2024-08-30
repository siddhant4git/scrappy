import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Signup = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(true);
    }
  }, [setToken]);

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Login successful');
          setToken(true);
          navigate('/');  // Navigate to home or dashboard after successful login
        }
      } else {
        setError('Please check your username and password');
      }

    } catch (error) {
      console.error('Error connecting to the database:', error);
      setError('Error connecting to the database. Please try again later.');
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); 
  };

  return (
    <>
      <form onSubmit={loginUser}>
        <div className="relative mb-5 flex justify-center align-middle">
          <TextField
            value={email}
            onChange={handleEmailChange}
            type="email"
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{
              input: { color: "white" },
              width: "43ch",
              "& .MuiInputLabel-root": { color: "#757575" },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "#64b5f6" },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "rgb(66, 153, 225)",
                },
              },
            }}
          />
        </div>
        <div className="relative mb-6 flex justify-center align-middle">
          <TextField
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePasswordChange}
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            sx={{
              input: { color: "white" },
              width: "43ch",
              "& .MuiInputLabel-root": { color: "#757575" },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "#64b5f6" },
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "rgb(66, 153, 225)",
                },
              },
            }}
          />
        </div>
        {error && (
          <div className="relative mb-6 flex justify-center align-middle text-red-500">
            {error}
          </div>
        )}
        <div className="relative mb-6 flex justify-center align-middle">
          <Button type="submit" value="Login" variant="contained" sx={{ width: "43ch" }}>
            Login
          </Button>
        </div>
        <div className="relative mb-6 flex justify-center align-middle">
          <h4 className="text-sm text-white">Not a member?</h4>
          <Link to="/register" className="text-sm text-blue-400 underline px-2 cursor-pointer">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
