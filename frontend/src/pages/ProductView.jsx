import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ProductView.css";

const ProductView = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const productResponse = await fetch(`http://localhost:8800/ShowProduct/${productId}`, {
        method: 'GET',
        credentials: 'include', // Include credentials with the request
      });

      const reviewsResponse = await fetch(`http://localhost:8800/ShowReviews/${productId}`, {
        method: 'GET',
        credentials: 'include',
      });

      const productData = await productResponse.json();
      const reviewsData = await reviewsResponse.json();

      if (productData.Status === "success") {
        setProduct(productData.product);
        setReviews(reviewsData.reviews);
        const imageFilename = productData.product.image;
        // Import the image dynamically
        import(`../assets/${imageFilename}.png`)
          .then((image) => setImagePath(image.default))
          .catch((error) => console.error('Error loading image:', error));
        console.log('Fetched product:', productData.product);
      } else {
        console.error('Error fetching product:', productData.Error);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8800/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId: id, review: reviewText, rating }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        // Refresh product details after review submission
        fetchProduct(id);
        // Clear review form
        setReviewText('');
        setRating(0);
      } else {
        console.error('Error submitting review:', responseData.Error);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderRatingStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };

  return (
    <div className="product-view">
      {product ? (
        <div className="product-view-detail">
          <div className="product-view-image-container">
            {imagePath && <img src={imagePath} alt={product.name} className="product-view-image" />}
          </div>
          <div className="product-view-info">
            <h1>{product.name}</h1>
            <p className="product-view-description">{product.description}</p>
            <p className="product-view-price">Price: ${product.price}</p>
            <button className="product-view-buy-now-button">Buy Now</button>
          </div>
          <div className="product-view-specifications">
            <h2>Specifications</h2>
            <ul>
              {product.specifications?.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
          <div className="product-view-reviews">
            <h2>Customer Reviews</h2>
            {reviews.length ? (
  reviews.map((review, index) => (
    <div key={index} className="product-view-review">
      <div className="product-view-review-rating">
        <p>Rating: <span className="rating-stars">{renderRatingStars(review.rating)}</span></p>
        <p><strong>Review: {review.review}</strong></p>
      </div>
    </div>
  ))
) : (
  <p>No reviews yet.</p>
)}





            <h3>Add Your Review</h3>
            <form onSubmit={handleSubmitReview} className="product-view-review-form">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Enter your review"
              ></textarea>
              <label>
                <hr></hr>
                <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                  <option value={0}>Select Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
              <button type="submit">Submit Review</button>
            </form>
          </div>
          <div className="product-view-related-products">
            <h2>Related Products</h2>
            <div className="product-view-related-products-list">
              {product.relatedProducts?.map((relatedProduct, index) => (
                <div key={index} className="product-view-related-product">
                  <img src={`/assets/${relatedProduct.image}.png`} alt={relatedProduct.name} />
                  <p>{relatedProduct.name}</p>
                  <p>Price: ${relatedProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductView;
