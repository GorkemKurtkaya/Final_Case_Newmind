import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Profile from "./Pages/Profile/Profile";  
import "./App.css";
import laptopindirim from "./assets/laptopindirim.jpg";
import telefonindirim from "./assets/telefonindirim.jpg";
import tabletindirim from "./assets/tabletindirim.jpg";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/notebook" element={<ShopCategory banner={laptopindirim} category="notebook" />} />
          <Route path="/phone" element={<ShopCategory  banner={telefonindirim} category="phone" />} />
          <Route path="/tablet" element={<ShopCategory banner={tabletindirim}  category="tablet" />} />


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
