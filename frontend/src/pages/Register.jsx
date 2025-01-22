import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import shop from '../assets/3.png';
import './Home.css';

const Register = ({ navigate }) => { 
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:8800/register', values);
      console.log(response.data);
      if (response.data.Status === 'success') {
        window.alert("Sing Up successful")
        navigate('/signin');
      } else {
        setErrors({ server: response.data.Error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrors({ server: 'An error occurred during registration' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='SPage'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className='formContainer'>
            <img src={shop} className='logo' alt='shop logo' />
            <h1 className='signuph1'>Sign up</h1>
            {errors.server && <div className="error">{errors.server}</div>}
            
            <ErrorMessage name="name" component="span" />
            <Field id="name" name="name" placeholder="Name" />

            <ErrorMessage name="email" component="span" />
            <Field id="email" name="email" placeholder="Email" />

            <ErrorMessage name="password" component="span" />
            <Field id="password" name="password" placeholder="Password" type="password" />

            <button type="submit" className='submitLogs' disabled={isSubmitting}>Sign up</button>
            <h4 className='remark-signup'>Are you a member? <Link to='/signin'  className='link-to-signin'>Sign in</Link></h4>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
