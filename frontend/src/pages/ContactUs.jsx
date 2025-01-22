import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to share your thoughts, feel free to reach out to us.</p>
      </div>
      <div className="contact-details">
        <div className="contact-info">
          <p><strong>Email:</strong> <a href="mailto:support@artistryhaven.com">support@artistryhaven.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+11234567890">+1 (123) 456-7890</a></p>
          <p><strong>Address:</strong></p>
          <p>
            Artistry Haven<br />
            123 Creative Lane<br />
            Craftsville, CA 12345
          </p>
          <p>Our customer service team is available Monday to Friday from 9 AM to 6 PM (PST). We aim to respond to all inquiries within 24 hours.</p>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
