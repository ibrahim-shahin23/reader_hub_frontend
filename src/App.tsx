import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarComponenet from './components/NavbarComponent';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'; // Import useLocation
import Dashboard from './pages/Dashboard';
import footer from './components/footer'
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <>
        <NavbarComponenet />
        <AppContent /> {/* Move the content to a separate component */}
        <Footer/>
      </>
    </Router>
  );
}

// Create a new component for the content
const AppContent: React.FC = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {/* Conditionally render the button based on the route */}
      {location.pathname !== '/dashboard' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
      {/* Define the route for the Dashboard */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;