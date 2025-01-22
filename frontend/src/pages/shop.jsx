import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS file specific to the Shop component
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8800/ShowProduct', {
        method: 'GET',
        credentials: 'include', // Include credentials with the request
      });
      const productsData = await response.json();
      setProducts(productsData.products);
      console.log('Fetched products:', productsData.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="shop">
      <h1 className="header">Shop</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="product-grid" >
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link to={`/ProductView/${product.id}`} key={product.id}>
              <ProductCard key={product.id} product={product} className="product-card" />
            </Link>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
