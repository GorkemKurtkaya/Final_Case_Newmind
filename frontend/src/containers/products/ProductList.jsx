import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { UncontrolledCarousel } from 'reactstrap';
import FilterBar from '../../components/FilterBar';
import Footer from '../../components/footer';

const ProductList = ({ search }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', priceRange: '' });

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Veri çekme hatası:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const searchFilteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(searchFilteredProducts);
    }, [search, products]);

    const applyFilters = (event) => {
        const { id, value } = event.target;
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, [id]: value };
            filterProducts(newFilters);
            return newFilters;
        });
    };

    const filterProducts = (filters) => {
        let filtered = products;
        if (filters.category) {
            filtered = filtered.filter(
                (product) =>
                    product.category.toLowerCase() === filters.category.toLowerCase()
            );
        }
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(
                (product) => product.price >= minPrice && product.price <= maxPrice
            );
        }
        setFilteredProducts(filtered);
    };

    if (loading) {
        return <div id="loading" className="loader">Loading...</div>;
    }

    return (
        <div>
            <section id="hero">
                <UncontrolledCarousel
                    items={[
                        {
                            key: 1,
                            src: 'https://patika-cohorts-prod.s3-eu-central-1.amazonaws.com/editor/q27rXvfbtSCen2ucz/moSPgvzuNt6TMNDyY-535588433631897.png',
                            captionText: ",",
                            header: ""
                        },
                        {
                            key: 2,
                            src: 'https://wallpapercave.com/wp/wp3605074.png',
                            captionText: ",",
                            header: ""
                        },
                        {
                            key: 3,
                            src: 'https://wallpapers.com/images/hd/hd-engineering-computer-technology-9c4d0251f783p6zh.jpg',
                            captionText: ",",
                            header: ""
                        }
                    ]}
                />
            </section>

            <FilterBar applyFilters={applyFilters} />

            <div id="products">
                {filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product} setProducts={setProducts} products={products} />
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default ProductList;
