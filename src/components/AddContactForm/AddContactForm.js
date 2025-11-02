import React, { useState } from 'react';
import './AddContactForm.css';

const AddContactForm = ({ onAddContact, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.phone) {
      onAddContact(formData);
      setFormData({ name: '', email: '', phone: '' });
    } else {
      
      if (!formData.name) {
        alert('Name is required');
      } else if (!formData.phone) {
        alert('Phone is required');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-contact-form">
      <h3>➕ Add New Contact</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address (optional)"
              value={formData.email}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            💾 Save Contact
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactForm;