import React from 'react';


const Login: React.FC = () => {
  return (
    <div className="container col-12 col-md-6 mt-5">
      <h2>Login</h2>
      <form action="home">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control mb-2"
            id="password"
            placeholder="Password"
          />
          <div className="d-flex justify-content-between">
        <a className='me-5' href="signup"><strong>Don't have an account</strong></a>
        <a href="resetPassword"><strong>Forgot your Password</strong></a>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;