import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ResetPasswordPage from './pages/resetPassword';
import VerifyEmailPage from './pages/verifyEmail';

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
    </Routes>
    <Footer/>
</Router>
  );
}

export default App;
