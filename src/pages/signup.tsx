import React from 'react';

const Signup: React.FC = () => {
  return (
    <div className="container col-12 col-md-6 mt-5">
      <h2>Signup</h2>
      <form action="verifyEmail">
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first-name"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last-name"
            placeholder="Enter your last name"
          />
        </div>
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
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select className="form-control" id="role">
            <option value="user" selected>User</option>
            <option value="publisher">Publisher</option>
          </select>
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
          </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control mb-2"
            id="confirm-password"
            placeholder="Password"
          />
          <a href="login"><strong>Already have an account</strong></a>
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;