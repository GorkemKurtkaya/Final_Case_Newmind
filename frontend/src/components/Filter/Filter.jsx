import React from 'react';
import './Filter.css';

const Filter = ({ applyFilters, handleSearch, search }) => {
  return (
    <div className="filter">
      {/* Search input alanı */}
      <div className="filter-item-search">
        <input
          type="text"
          placeholder="Ürün Ara..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Kategori seçimi */}
      <div className="filter-item">
        <label htmlFor="category">Kategori:</label>
        <select id="category" onChange={applyFilters}>
          <option value="">Tümü</option>
          <option value="notebook">Notebook</option>
          <option value="phone">Cep Telefonu</option>
          <option value="tablet">Tablet</option>
        </select>
      </div>

      {/* Fiyat aralığı seçimi */}
      <div className="filter-item">
        <label htmlFor="priceRange">Fiyat Aralığı:</label>
        <select id="priceRange" onChange={applyFilters}>
          <option value="">Tümü</option>
          <option value="0-3500">0 - 3500 ₺</option>
          <option value="2500-7000">2500 - 7000 ₺</option>
          <option value="7000-15000">7000 - 15000 ₺</option>
          <option value="15000-30000">15000 - 30000 ₺</option>
          <option value="30000 - 100000">30000 - 100000 ₺</option>
          <option value="100000 - 320000">100000 - 320000 ₺</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
