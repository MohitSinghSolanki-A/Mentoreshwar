import React, { useState } from 'react'
import './RegistrationForm.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...FormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("🎉 Registration successful! Please login.", { position: "top-right" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrors(data.error);
        toast.error(`❌ ${data.error}`, { position: "top-right" });
      }
    } catch (error) {
      console.log(error);
      toast.error("❌ Something went wrong. Try again!", { position: "top-right" });
    }
  };

  // const validateForm = (data) => {
  //   const errors = {};

  //   if (!data.firstName) errors.firstName = 'First name is required';
  //   if (!data.lastName) errors.lastName = 'Last name is required';
  //   if (!data.email) errors.email = 'Email is required';
  //   else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email format';
  //   if (!data.password) errors.password = 'Password is required';
  //   if (!data.agreeTerms) errors.agreeTerms = 'You must agree to the terms and conditions';

  //   return errors;
  // };

  return (
    <form onSubmit={handleSubmit} className='mt-1rem'>
      <div className='col-2 flex' style={{ gap: '20px' }}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className='input-box w-full' placeholder='Enter first name' />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className='input-box w-full' placeholder='Enter last name' />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>

      <div className='col-1'>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className='input-box w-full' placeholder='Enter email' />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className='col-1'>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className='input-box' placeholder='Enter password' />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className='mt-1rem'>
        <label className='flex'>
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className='check-box-size' />
          I agree to the terms & conditions
        </label>
        {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}
      </div>

      <button type="submit" className='primary-btn'>Create Account</button>

      <div className='flex item-align'>
        <div className='col-3 item-align-grid align-text'>
          <div className='bg flex item-end'></div>
          <p>Or register with</p>
          <div className='bg flex item-start'></div>
        </div>
      </div>
    </form>
  );
}
