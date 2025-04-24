import React, { useState } from 'react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('http://reader-hub.us-east-1.elasticbeanstalk.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log(errorData)
        throw new Error(errorData?.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store token or user data if returned by the API
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect to home page after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (err) {
      setError(`Login failed: ${err instanceof Error ? err.message : 'Invalid credentials'}`);
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container col-12 col-md-6 mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            
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
            value={formData.password}
            onChange={handleChange}
            
          />
          <div className="d-flex justify-content-between">
            <a className='me-5' href="signup"><strong>Don't have an account</strong></a>
            <a href="resetPassword"><strong>Forgot your Password</strong></a>
          </div>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;