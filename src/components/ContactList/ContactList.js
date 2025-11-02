import React, { useEffect, useRef } from 'react';
import ContactGroup from '../ContactGroup/ContactGroup';
import ContactListGrid from '../ContactListGrid/ContactListGrid';
import './ContactList.css';

const ContactList = ({ contacts, onContactClick, viewMode, scrollToLetter }) => {
  const groupRefs = useRef({});
  const totalContacts = Object.values(contacts).flat().length;

  
  useEffect(() => {
    if (scrollToLetter && groupRefs.current[scrollToLetter]) {
      groupRefs.current[scrollToLetter].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [scrollToLetter]);

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
                <div 
                  key={letter}
                  ref={el => groupRefs.current[letter] = el}
                  className="contact-group-wrapper"
                >
                  <ContactGroup
                    letter={letter}
                    contacts={groupContacts}
                    onContactClick={onContactClick}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="no-contacts">
            <div className="no-contacts-icon">👥</div>
            <h3>No contacts found</h3>
            <p>Try adjusting your search or add new contacts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;