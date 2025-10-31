import React from 'react';
import ContactCard from '../ContactCard/ContactCard';
import './ContactGroup.css';

const ContactGroup = ({ letter, contacts, onContactClick }) => {
  return (
    <div className="contact-group">
      <div className="group-header">
        <div className="group-letter">{letter}</div>
        <div className="group-count">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="group-contacts">
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onClick={() => onContactClick(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactGroup;