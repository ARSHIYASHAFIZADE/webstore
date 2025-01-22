import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import shop from '../assets/3.png';
import './Home.css';

const Signin = ({ navigate }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:8800/signin', values, {
        withCredentials: true, // Include credentials (cookies)
      });
      console.log(response.data);
      if (response.data.Status === 'success') {
        navigate('/'); // Redirect to home or another page after successful signin
      } else {
        setErrors({ server: response.data.Error || 'Signin failed' });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrors({ server: 'An error occurred during signin' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='SPage'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className='formContainer'>
            <img src={shop} className='logo' alt='shop logo' />
            <h1 className='signinh1'>Sign in</h1>
            {errors.server && <div className="error">{errors.server}</div>}

            <ErrorMessage name="email" component="span" />
            <Field id="email" name="email" placeholder="Email" />

            <ErrorMessage name="password" component="span" />
            <Field id="password" name="password" placeholder="Password" type="password" />

            <button type="submit" className='submitLogs' disabled={isSubmitting}>Sign in</button>
            <h4 className='remark-signin'>Not a member? <Link to='/register' className='link-to-signup'>Sign up</Link></h4>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
