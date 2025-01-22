import React from 'react';
import './FAQs.css';

const FAQs = () => {
  return (
    <div className="faqs-container">
      
      <h1>Frequently Asked Questions</h1>
      <div className="faq">
        <h2 className='faqh2'>What types of products do you offer?</h2>
        <p>We offer a wide range of arts and crafts products, including handmade jewelry, unique home decor, custom paintings, and much more.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'>How can I place an order?</h2>
        <p>Simply browse our online shop, add your desired items to the cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'>What payment methods do you accept?</h2>
        <p>We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'> How long will it take to receive my order?</h2>
        <p>Standard shipping typically takes 5-7 business days. For international orders, please allow 10-15 business days. Expedited shipping options are also available at checkout.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'>Can I track my order?</h2>
        <p>Yes, once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'>What is your return policy?</h2>
        <p>We accept returns within 30 days of purchase. Items must be in their original condition. Please visit our Returns and Exchanges page for more details.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'>How can I contact customer service?</h2>
        <p>You can reach our customer service team via email at support@artistryhaven.com or by phone at +1 (123) 456-7890.</p>
      </div>
      <div className="faq">
        <h2 className='faqh2'>Do you offer custom orders?</h2>
        <p>Yes, we do! If you have a specific request or custom order in mind, please contact us at customorders@artistryhaven.com, and we will be happy to assist you.</p>
      </div>
    </div>
  );
};

export default FAQs;
