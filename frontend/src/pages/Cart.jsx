import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8800/ShowUserCart', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();

        if (data.Status === 'success') {
          setCartItems(data.cart);
        } else {
          throw new Error(data.Error || 'Failed to fetch cart items');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCartItems();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalP, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/PaymentPage');
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {error && <p className="cart-error">{error}</p>}
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => {
              const imagePath = require(`../assets/${item.img}.png`);
              return (
                <li key={item.id} className="cart-item">
                  <img src={imagePath} alt={item.pName} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.pName}</p>
                    <p className="cart-item-description">{item.des}</p>
                    <p className="cart-item-price">Price: ${item.PP}</p>
                    <p className="cart-item-total">Total: ${item.totalP}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-summary">
            <p className="cart-total">Total Price: ${getTotalPrice()}</p>
            <button className="cart-checkout-button" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
