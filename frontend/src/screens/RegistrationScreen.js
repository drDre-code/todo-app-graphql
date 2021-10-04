import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';




export default function RegistrationScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (redirect) {
      history.push("/todo");
    }
  }, [redirect, history]);

  if (document.cookie) {
    const token = document.cookie.split(';').find(x => x.trim().startsWith('token'));
    if (token) {
      return (
        <Redirect to="/todo" />
      );
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    if (password !== confirmPassword) {
      return alert('Password and confirm password are not the same');
    } else {

      const backendUrl = process.env.REACT_APP_BACK_END_URL;
      const { data: { data: { createUser: { message, token } } } } = await axios.post(
        `${backendUrl}/graphql`,
        {
          query: `mutation{
          createUser(name: "${name}", email: "${email}", password: "${password}"){
            message
            token
          }
        }`
        }
      );
      if (token) {
        document.cookie = `token=${token}`;
        setRedirect(true);
      }
      if (message) {
        setErrorMessage(message)
      }
    }
  } catch (err) {
    const message = err.message.data || err.message;
    setErrorMessage(message);
  }
  };
  
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>

        <div>
          <h1>Create Account</h1>
        </div>

        {errorMessage && <div variant="danger">{errorMessage}</div>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to="/signin" className="link primary">Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
