import React from 'react';
import './Filter.css';

const Filter = ({ applyFilters }) => {
  return (
    <div className="filter">

      <div className="filter-item">
        <label htmlFor="category">Kategori:</label>
        <select id="category" onChange={applyFilters}>
          <option value="">Tümü</option>
          <option value="men's clothing">Notebook</option>
          <option value="women's clothing">Cep Telefonu</option>
          <option value="jewelery">Tablet</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="priceRange">Fiyat Aralığı:</label>
        <select id="priceRange" onChange={applyFilters}>
          <option value="">Tümü</option>
          <option value="0-50">0 - 50 ₺</option>
          <option value="50-100">50 - 100 ₺</option>
          <option value="100-500">100 - 500 ₺</option>
          <option value="500-1000">500 - 1000 ₺</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
