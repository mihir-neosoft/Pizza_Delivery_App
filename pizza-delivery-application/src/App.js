import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Menu from './Components/Menu';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
import OrderSuccess from './Components/OrderSuccess';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/Menu" element={<Menu/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Checkout" element={<Checkout/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Logout" element={<Logout/>} />
          <Route path="/OrderSuccess" element={<OrderSuccess/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
