import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      const backendUrl = process.env.REACT_APP_BACK_END_URL;

      const { data } = await axios.post(
        `${backendUrl}/users`,
        {
          query: `{
            Signin(email: "${email}", password:"${password}"){
              token
            }
          }`
        }
      );

      const { token } = data.data.Signin;
      document.cookie = `token=${token}`;
      setRedirect(true);

    } catch (err) {
      const message = err.message.data || err.message;
      setError(message);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {error && <div className="danger">{error}</div>}
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
          <label />
          <button type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/registration" className="link primary">Create-your-account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
