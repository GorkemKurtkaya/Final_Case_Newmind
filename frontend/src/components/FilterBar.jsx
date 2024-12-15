import React from 'react';

const FilterBar = ({ applyFilters }) => {
  return (
    <div id="filter" className="navbar">
      <div className="filter-item">
        <label htmlFor="category">Kategori:</label>
        <select id="category" onChange={applyFilters}>
          <option value="">Tümü</option>
          <option value="men's clothing">Erkek Giyim</option>
          <option value="women's clothing">Kadın Giyim</option>
          <option value="jewelery">Takı</option>
          <option value="electronics">Elektronik</option>
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

export default FilterBar;
