import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import Shop from './pages/shop';
import { UserProvider } from './UserContext';
import Cart from './pages/Cart';
import PaymentPage from './pages/PaymentPage';
import ProductView from './pages/ProductView';
import AboutUs from './pages/AboutUs'; // Import AboutUs page
import ContactUs from './pages/ContactUs'; // Import ContactUs page
import FAQs from './pages/FAQs'; // Import FAQs page

const App = () => {
  const navigate = (path) => {
    console.log("Navigating to:", path);
    window.location.href = path;
  };

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin navigate={navigate} />} />
            <Route path="/register" element={<Register navigate={navigate} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/ProductView/:id" element={<ProductView />} />
            <Route path="/aboutus" element={<AboutUs />} /> {/* Add AboutUs route */}
            <Route path="/contactus" element={<ContactUs />} /> {/* Add ContactUs route */}
            <Route path="/faqs" element={<FAQs />} /> {/* Add FAQs route */}
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
