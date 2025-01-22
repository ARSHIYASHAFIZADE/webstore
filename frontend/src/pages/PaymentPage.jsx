import React, { useState } from 'react';
import './PaymentPage.css';
import {useNavigate} from 'react-router-dom'
const PaymentPagePayment = () => { // Updated component name
  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const handlePayment = (e) => {
    e.preventDefault();
    // Implement payment processing logic here
    // For demonstration, let's simulate a payment processing delay using setTimeout
    setTimeout(() => {
      // Redirect to the main page after payment is submitted successfully
      navigate('/');
      // Show a success message (you can replace it with your actual logic)
      alert('Payment submitted successfully');
    }, 2000); // 2000 milliseconds delay
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="payment-container-payment">
      <h1 className="payment-title-payment">Payment Page - Step {step}</h1>
      {step === 1 && (
        <form className="payment-form-payment" onSubmit={nextStep}>
          <div className="form-group-payment">
            <label htmlFor="name">Name on Card</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field-payment"
            />
          </div>
          <div className="form-group-payment">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="input-field-payment"
            />
          </div>
          <div className="form-group-payment">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
              className="input-field-payment"
            />
          </div>
          <div className="form-group-payment">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className="input-field-payment"
            />
          </div>
          <button type="submit" className="next-button-payment">Next</button>
        </form>
      )}
      {step === 2 && (
        <div className="confirmation-payment">
          <h2>Confirm Details</h2>
          <p><strong>Name on Card:</strong> {name}</p>
          <p><strong>Card Number:</strong> {cardNumber}</p>
          <p><strong>Expiry Date:</strong> {expiryDate}</p>
          <p><strong>CVV:</strong> {cvv}</p>
          <button onClick={prevStep} className="back-button-payment">Back</button>
          <button onClick={handlePayment} className="submit-button-payment">Submit Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPagePayment; // Updated component name
