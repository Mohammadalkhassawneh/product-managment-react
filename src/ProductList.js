import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    product_name: '',
    sender_fee: '',
    sender_fee_percentage: '',
    logo_url: '',
    product_id: '',
    discount_percentage: '',    
    denomination_type: '',    
    recipient_currency_code: '',    
    min_recipient_denomination: '',    
    max_recipient_denomination: '',
    max_sender_denomination: '',
    min_sender_denomination: '',
    fixed_recipient_denominations: '',
    sender_currency_code: '',    
    fixed_sender_denominations: '',    
    fixed_recipient_to_sender_denominations_map: '',    
    discount_percentage: '',
    logo_urls: '',
    brand: '',
    country: '',
    redeem_instruction: '',  
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

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/products', newProductData);
      fetchProducts();
      setShowAddModal(false);
      setNewProductData({
        product_name: '',
        sender_fee: '',
        sender_fee_percentage: '',
        logo_url: '',
        product_id: '',
        discount_percentage: '',    
        denomination_type: '',    
        recipient_currency_code: '',    
        min_recipient_denomination: '',    
        max_recipient_denomination: '',
        max_sender_denomination: '',
        min_sender_denomination: '',
        fixed_recipient_denominations: '',   
        sender_currency_code: '',    
        fixed_sender_denominations: '',    
        fixed_recipient_to_sender_denominations_map: '',    
        discount_percentage: '',
        logo_urls: '',
        brand: '',
        country: '',
        redeem_instruction: '', 
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewProductData({
      ...newProductData,
      [event.target.name]: event.target.value,
    });
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

  return (
    <div>
      <h2>Product List</h2>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Product
      </Button>
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

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="addFormName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="product_name"
          value={newProductData.product_name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormSenderFee">
        <Form.Label>Sender Fee</Form.Label>
        <Form.Control
          type="number"
          name="sender_fee"
          value={newProductData.sender_fee}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormSenderFeePercentage">
        <Form.Label>Sender Fee Percentage</Form.Label>
        <Form.Control
          type="number"
          name="sender_fee_percentage"
          value={newProductData.sender_fee_percentage}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormProductId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control
          type="text"
          name="product_id"
          value={newProductData.product_id}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormDiscountPercentage">
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control
          type="number"
          name="discount_percentage"
          value={newProductData.discount_percentage}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormDenominationType">
        <Form.Label>Denomination Type</Form.Label>
        <Form.Control
          type="text"
          name="denomination_type"
          value={newProductData.denomination_type}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormRecipientCurrencyCode">
        <Form.Label>Recipient Currency Code</Form.Label>
        <Form.Control
          type="text"
          name="recipient_currency_code"
          value={newProductData.recipient_currency_code}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormMinRecipientDenomination">
        <Form.Label>Min Recipient Denomination</Form.Label>
        <Form.Control
          type="number"
          name="min_recipient_denomination"
          value={newProductData.min_recipient_denomination}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormMaxRecipientDenomination">
        <Form.Label>Max Recipient Denomination</Form.Label>
        <Form.Control
          type="number"
          name="max_recipient_denomination"
          value={newProductData.max_recipient_denomination}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormSenderCurrencyCode">
        <Form.Label>Sender Currency Code</Form.Label>
        <Form.Control
          type="text"
          name="sender_currency_code"
          value={newProductData.sender_currency_code}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormFixedSenderDenominations">
        <Form.Label>Fixed Sender Denominations</Form.Label>
        <Form.Control
          type="text"
          name="fixed_sender_denominations"
          value={newProductData.fixed_sender_denominations}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormFixedRecipientToSenderDenominationsMap">
        <Form.Label>Fixed Recipient to Sender Denominations Map</Form.Label>
        <Form.Control
          type="text"
          name="fixed_recipient_to_sender_denominations_map"
          value={newProductData.fixed_recipient_to_sender_denominations_map}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormLogoUrls">
        <Form.Label>Logo URLs</Form.Label>
        <Form.Control
          type="text"
          name="logo_urls"
          value={newProductData.logo_urls}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormBrand">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={newProductData.brand}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={newProductData.country}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="addFormRedeemInstruction">
        <Form.Label>Redeem Instruction</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="redeem_instruction"
          value={newProductData.redeem_instruction}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={addProduct}>
      Add Product
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default ProductList;
