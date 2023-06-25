import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState({
    id: null,
    product_name: '',
    sender_fee: '',
    sender_fee_percentage: '',
  });

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

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/products/${productId}`);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = (productId, product_name, sender_fee, sender_fee_percentage) => {
    setEditProductData({
      id: productId,
      product_name: product_name,
      sender_fee: sender_fee,
      sender_fee_percentage: sender_fee_percentage,
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditProduct = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/products/${editProductData.id}`, {
        product_name: editProductData.product_name,
        sender_fee: editProductData.sender_fee,
        sender_fee_percentage: editProductData.sender_fee_percentage,
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProductData.id ? { ...product, ...editProductData } : product
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setEditProductData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className="row m-3 mb-1">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-1">
            <div className="card">
              <ProductCard product={product} />
              <div className="card-body">
                <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    openEditModal(
                      product.id,
                      product.product_name,
                      product.sender_fee,
                      product.sender_fee_percentage
                    )
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                value={editProductData.product_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormSenderFee">
              <Form.Label>Sender Fee</Form.Label>
              <Form.Control
                type="text"
                name="sender_fee"
                value={editProductData.sender_fee}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormSenderFeePercentage">
              <Form.Label>Sender Fee Percentage</Form.Label>
              <Form.Control
                type="text"
                name="sender_fee_percentage"
                value={editProductData.sender_fee_percentage}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
