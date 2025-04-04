import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldId = e.target.id;
    // Convert field IDs like "first-name" to "firstName" (camelCase)
    const fieldName = fieldId.includes('-') 
      ? fieldId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      : fieldId;
    
    setFormData({
      ...formData,
      [fieldName]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('https://Readerhub.eu-north-1.elasticbeanstalk.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          password: formData.password
        })
      });
      
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      
      setSuccess('Signup successful! Redirecting to verification page...');
      // Redirect to verify email page after successful signup
      setTimeout(() => {
        window.location.href = '/verifyEmail';
      }, 2000);
      
    } catch (err) {
      setError('Failed to sign up. Please try again later.');
      console.error('Signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container col-12 col-md-6 mt-5">
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first-name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
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
            value={formData.lastName}
            onChange={handleChange}
            required
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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select 
            className="form-control" 
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="publisher">Publisher</option>
            <option value="admin">Admin</option>
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control mb-2"
            id="confirmPassword"
            placeholder="Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <a href="login"><strong>Already have an account</strong></a>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup;