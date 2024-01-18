import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:3000/users?username=${username}`)
        .then((res) => res.json())
        .then((users) => {
          const user = users.find((user) => user.password === password);
          if (user) {
            toast.success('Success');
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('userrole', user.role);
            navigate('/home');
          } else {
            toast.error('Please Enter valid credentials');
          }
        })
        .catch((err) => {
          toast.error('Login Failed due to :' + err.message);
        });
    }
  };
  
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div>
      <div className="login-page">
        <div className="form">
          <h1>Login</h1>
          <form className="login-form" onSubmit={ProceedLogin}>
            <input
              id="login-username"
              type="text"
              placeholder="username"
              name="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="login-password"
              type="password"
              placeholder="password"
              name="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" id="login-button">
              Login
            </button>
            <p className="message">
              Not registered? <Link to={'/register'}>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
