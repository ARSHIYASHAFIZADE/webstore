import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Home.css';
import Gallery from './Gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard'; // Import the ProductCard component
import imgheader from "../assets/image.png";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8800/ShowProduct");
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  window.addEventListener('beforeunload', async () => {
    // Make a POST request to inform the server about tab close
    await fetch('http://localhost:8800/logout-on-close', {
        method: 'POST',
        credentials: 'include',
    });
});

const handleLogout = async () => {
  try {
    await axios.get('http://localhost:8800/logout', { withCredentials: true });
    // After successful logout, you may want to navigate to the login page or perform other actions
    // For now, let's just reload the page
    window.location.reload();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

  return (
    <div className="Layout">
      <nav className="navbar">
        <div className="container">
          <div className="brand">
            <Link to="/">Arshiya</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/Signin">Sign In</Link></li>
            <li><Link to="/Register">Sign Up</Link></li>
            <li><Link  onClick={handleLogout}>Log out</Link></li>
            <li>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className='hero'>
        <div className="container">
          <div className="hero-video">
            <img src={imgheader} className='header-img' alt='header' />
            <div className="video-overlay"></div>
            <div className="hero-text">
              <h1>Welcome to Arshiya Store</h1>
              <p>Discover the essence of luxury</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {products.map(product => (
              <Link 
                to={`/ProductView/${product.id}`} 
                key={product.id} 
                className='linkk-to-p'
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2>Gallery</h2>
          <Gallery />
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter to receive updates on new arrivals, promotions, and exclusive offers.</p>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Invalid email').required('Email is required')
            })}
            onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
              try {
                await axios.post("http://localhost:8800/newsletter", { email: values.email });
                console.log("Newsletter subscription successful");
                resetForm();
                setStatus({ success: "Subscription successful!" });
                setTimeout(() => {
                  window.location.reload(); // Reload the page after 2 seconds
                }, 2000);
              } catch (error) {
                console.error('Newsletter subscription failed:', error);
                setStatus({ error: "Subscription failed. Please try again." });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ status }) => (
              <Form className="newsletter-form">
                <div className="input-container">
                  <Field type="email" name="email" placeholder="Enter your email" />
                  <button type="submit" className="cta-button">Subscribe</button>
                </div>
                <ErrorMessage name="email" component="div" className="error-message" />
                {status && status.success && <div className="success-message">{status.success}</div>}
                {status && status.error && <div className="error-message">{status.error}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </section>
      
      <footer>
        <div className="container">
          <div className="footer-links">
            <ul>
              <li><Link to="/AboutUs">About Us</Link></li>
              <li><Link to="/ContactUs">Contact Us</Link></li>
              <li><Link to="/FAQs">FAQs</Link></li>
            </ul>
          </div>
          <div className="social-icons">
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
