import React from 'react';
import ContactGroup from '../ContactGroup/ContactGroup';
import ContactListGrid from '../ContactListGrid/ContactListGrid';
import './ContactList.css';

const ContactList = ({ contacts, onContactClick, viewMode }) => {
  const totalContacts = Object.values(contacts).flat().length;

  return (
    <div className="contact-list">
      <div className="list-container">
        {totalContacts > 0 ? (
          viewMode === 'grid' ? (
            <ContactListGrid 
              contacts={contacts} 
              onContactClick={onContactClick} 
            />
          ) : (
            <div className="contact-groups">
              {Object.entries(contacts).map(([letter, groupContacts]) => (
                <ContactGroup
                  key={letter}
                  letter={letter}
                  contacts={groupContacts}
                  onContactClick={onContactClick}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )
        ) : (
          <div className="no-contacts">
            <div className="no-contacts-icon">👥</div>
            {/* <h3>No contacts found</h3>
            <p>Try adjusting your search or add new contacts</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;