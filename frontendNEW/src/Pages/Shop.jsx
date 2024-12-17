import React, { useEffect, useState } from 'react';
import OurProducts from '../Components/OurProducts/OurProducts';
import Hero from '../Components/Hero/Hero';
import Filter from '../Components/Filter/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
  const [ourProducts, setOurProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState(""); // Arama için state
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });

  const fetchInfo = () => {
    fetch('http://localhost:3000/product/')
      .then((res) => res.json())
      .then((data) => {
        setOurProducts(data);
        setFilteredProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Arama fonksiyonu
  useEffect(() => {
    const searchFilteredProducts = ourProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(searchFilteredProducts);
    
    // Sayfanın scroll pozisyonunu koruyun
    window.scrollTo(0, 0);
  }, [search, ourProducts]);

  // Filtreleme fonksiyonu
  const filterProducts = (filters) => {
    let updatedProducts = [...ourProducts];

    if (filters.category) {
      updatedProducts = updatedProducts.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      updatedProducts = updatedProducts.filter(
        product => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(updatedProducts);
  };

  const applyFilters = (event) => {
    const { id, value } = event.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [id]: value };
      filterProducts(newFilters);
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value); // Arama kutusuna yazılan değeri state'e al
  };

  return (
    <div>
      <Hero />
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Ürün Ara..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <Filter applyFilters={applyFilters} />
      <OurProducts data={filteredProducts} />
    </div>
  );
};

export default Shop;
