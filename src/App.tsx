import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
<Router>
    <NavbarComponent/>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
    </Routes>
    <Footer/>
</Router>
  );
}

export default App;
