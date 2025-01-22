import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import './Home.css'; // Ensure you have appropriate CSS
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(UserContext);
    const lightRadiusRef = useRef(null);
    const nav = useNavigate();
    if (!product) {
        return null;
    }

    const addToCart = async (e) => {
        e.stopPropagation(); // Prevent event bubbling
        e.preventDefault(); // Prevent default behavior
        if (!user) {
            console.error('User is not logged in');
            nav('Signin');
            return;
        }

        const totalPrice = product.price * quantity;

        const cartItem = {
            Userid: user.id,
            pName: product.name,
            img: product.image,
            des: product.description,
            PP: product.price,
            quantity,
            totalP: totalPrice
        };

        try {
            const response = await fetch('http://localhost:8800/UserCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(cartItem),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Product added to cart successfully', result);
                window.location.reload();
            } else {
                console.error('Error adding product to cart:', result.Error);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        lightRadiusRef.current.style.left = `${x}px`;
        lightRadiusRef.current.style.top = `${y}px`;
    };

    const handleMouseEnter = () => {
        lightRadiusRef.current.style.opacity = 1;
    };

    const handleMouseLeave = () => {
        lightRadiusRef.current.style.opacity = 0;
    };

    const imagePath = require(`../assets/${product.image}.png`);
    return (
        <div 
            className="product-card" 
            onMouseMove={handleMouseMove} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <img src={imagePath} alt={product.name} className="product-image" />
            <div ref={lightRadiusRef} className="light-radius"></div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
            </div>
            <div>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantityChange} 
                    min="1" 
                    className="quantity-input" 
                    onClick={(e) => e.stopPropagation()} // Prevent navigation on input click
                />
                <button className='add-to-cart-button' onClick={addToCart}>Add to cart</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductCard;
