import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { toast } from 'react-toastify';

function Register() {
  // const[id,setdchange]=useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const navigate = useNavigate()

  const IsValidate = () => {
    let isproceed = true
    let errormessage = 'Please enter the value in'
    if (username === null || username === '') {
      isproceed = false
      errormessage += 'username'
    }
     // Password validation
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (password === null || password === '' || !passwordPattern.test(password)) {
    isproceed = false;
    errormessage += 'password (minimum 8 characters, at least one letter, and one number), ';
  }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === null || email === '' || !emailPattern.test(email)) {
      isproceed = false
      errormessage += 'email'
    }
    if (!isproceed) {
      toast.warning(errormessage.slice(0, -2))
    }
    return isproceed
  }

 // ... (existing code)

const handlesubmit = (e) => {
  e.preventDefault();
  let regobj = { username, password, email, todos: [] }; // Include an empty todos array for each new user
  console.log(regobj);

  if (IsValidate()) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(regobj)
    }).then((res) => {
      toast.success('Register successfully');
      navigate('/');
    }).catch((err) => {
      toast.error('Failed :' + err.message);
    });
  }
}

// ... (existing code)

  return (
    <div>
      <div className="login-page">
        <div className="form" >
          <h1>Register</h1>
          <form className="register-form" onSubmit={handlesubmit}>
            <input required
              id="create-username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />

            <input
              id="create-password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            /> 
   
            <input
              id="create-email"
              type="text"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              name="create-button"
              type="submit"
              id="create-button"

            >
              Create
            </button>
            <p className="message">
              Already registered? <Link to={'/'}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
