import React from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, onClick }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="contact-card" onClick={onClick}>
      <div className="contact-avatar">
        {getInitials(contact.name)}
      </div>
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-email">{contact.email}</p>
        <p className="contact-phone">{contact.phone}</p>
      </div>
      <div className="contact-arrow">›</div>
    </div>
  );
};

export default ContactCard;