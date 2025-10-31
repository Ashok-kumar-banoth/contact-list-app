import React from 'react';
import ContactCard from '../ContactCard/ContactCard';
import './ContactListGrid.css';

const ContactListGrid = ({ contacts, onContactClick }) => {
  const allContacts = Object.values(contacts).flat();

  return (
    <div className="contact-grid">
      <div className="grid-header">
        <h3>All Contacts ({allContacts.length})</h3>
        <div className="grid-controls">
          <span className="grid-info">Grid View</span>
        </div>
      </div>
      <div className="grid-contacts">
        {allContacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onClick={() => onContactClick(contact)}
            viewMode="grid"
          />
        ))}
      </div>
    </div>
  );
};

export default ContactListGrid;