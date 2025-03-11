import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavbarComponenet from './components/NavbarComponent';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
<Router>
    <NavbarComponenet/>
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
