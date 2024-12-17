import React, { useContext, useRef, useState,useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping,faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo.png'

const Navbar = () => {
  let [menu, setMenu] = useState("shop");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/checkUser", {
          method: "GET",
          credentials: "include", // Cookie'yi göndermek için gerekli
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // Cookie'yi göndermek için gerekli
      });
      setIsAuthenticated(false);
      window.location.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuRef = useRef();

  return (
    <div className='nav'>
      <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
      </Link>
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link to='/' style={{ textDecoration: 'none' }}>Ana Sayfa</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("notebook") }}><Link to='/notebook' style={{ textDecoration: 'none' }}>Notebook</Link>{menu === "notebook" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("phone") }}><Link to='/phone' style={{ textDecoration: 'none' }}>Cap Telefonu</Link>{menu === "phone" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("tablet") }}><Link to='/tablet' style={{ textDecoration: 'none' }}>Tablet</Link>{menu === "tablet" ? <hr /> : <></>}</li>
        
      </ul>
      <div className="nav-login-cart">
      {isAuthenticated
        ? <>
            <a onClick={logout} style={{cursor:'pointer', color:"#551A8B"}}><FontAwesomeIcon icon={faRightFromBracket} /></a>
            <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
          </>
        : <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
      <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
      </div>
    </div>
  )
}

export default Navbar
