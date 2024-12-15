import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './containers/products/ProductList';
import ProductDetails from './containers/products/ProductDetails';
import Header from './components/header';
import "./App.css";

const App = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (value) => {
        setSearch(value);
    };

    return (
        <Router>
            <Header search={search} handleSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<ProductList search={search} />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
