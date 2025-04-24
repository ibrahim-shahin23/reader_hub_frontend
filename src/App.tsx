import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ResetPasswordPage from './pages/resetPassword';
import VerifyEmailPage from './pages/verifyEmail';
import BooksPage from './components/books/BooksPage'; // Import the BooksPage component

function App() {
  return (
    <Router>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/verifyEmail" element={<VerifyEmailPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<BooksPage />} /> {/* Added BooksPage route */}
      </Routes>
      <AppContent />
      <Footer/>
    </Router>
  );
}

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/dashboard">
            <button
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              DASHBOARD
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default App;