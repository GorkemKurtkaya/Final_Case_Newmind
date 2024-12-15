import React from 'react';
import { Link } from 'react-router-dom';
import './style/header.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const Header = ({ search, handleSearch }) => {
  return (
    <div>
      <header className="header">
        <Link to="/" className="logo">
          Görkem <span>Shop</span>
        </Link>


        <nav className="navbar">
          <Link to="/">Ana Sayfa</Link>
        
        </nav>
        
        <div className="search-box">
          <button className="btn-search">
          
            <FontAwesomeIcon style={{marginBottom:"50px"}} icon={faMagnifyingGlass} />
          </button>
          <input
            className="input-search"
            value={search}
            style={{ marginLeft: "10px" }}
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Ürün Ara"
          />
        </div>

      </header>
    </div>
  );
};

export default Header;
