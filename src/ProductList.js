import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'; // Import the CSS file for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.product_name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
