import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Profile from "./Pages/Profile/Profile";  // Profile sayfasını import ediyoruz
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/notebook" element={<ShopCategory category="notebook" />} />
          <Route path="/phone" element={<ShopCategory category="phone" />} />
          <Route path="/tablet" element={<ShopCategory category="tablet" />} />


          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
