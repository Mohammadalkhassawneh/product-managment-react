import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="card">
      <img className="card-img-top" src={product.logo_urls[0]} alt={product.product_name} />
      <div className="card-body">
        <h3 className="card-title">{product.product_name}</h3>
        <button className="btn btn-link text-secondary" onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <div className="product-details">
            <ul className="details-list p-3">
              <li>
                <strong>Description:</strong> {product.description}
              </li>
              <li>
                <strong>ID:</strong> {product.product_id}
              </li>
              <li>
                <strong>Sender Fee:</strong> {product.sender_fee}
              </li>
              <li>
                <strong>Sender Fee Percentage:</strong> {product.sender_fee_percentage}
              </li>
              <li>
                <strong>Discount Fee Percentage:</strong> {product.discount_percentage}
              </li>
              <li>
                <strong>Recipient Currency Code:</strong> {product.recipient_currency_code}
              </li>
              <li>
                <strong>Min Recipient Denomination:</strong> {product.min_recipient_denomination}
              </li>
              <li>
                <strong>Sender Currency Code:</strong> {product.sender_currency_code}
              </li>
              <li>
                <strong>Max Sender Denomination:</strong> {product.max_sender_denomination}
              </li>
              <li>
                <strong>Fixed Recipient Denominations:</strong>{' '}
                {Object.values(product.fixed_recipient_denominations).join(', ')}
              </li>
              <li>
                <strong>Fixed Sender Denominations:</strong>{' '}
                {Object.values(product.fixed_sender_denominations).join(', ')}
              </li>
              <li>
                <strong>Fixed Recipient To Sender Denominations Map:</strong>
                <ul>
                  {Object.entries(product.fixed_recipient_to_sender_denominations_map).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Brand:</strong>
                <ul>
                  {Object.entries(product.brand).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Country:</strong>
                <ul>
                  {Object.entries(product.country).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Redeem Instructions:</strong>
                <ul>
                  {Object.entries(product.redeem_instruction).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
                  }


export default ProductCard;