import React from 'react';
import './ContactModal.css';

const ContactModal = ({ contact, onClose, onDelete }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div 
            className="contact-avatar-large"
            style={{ background: contact.avatarColor }}
          >
            {getInitials(contact.name)}
          </div>
          <h2>{contact.name}</h2>
          <p className="contact-title">{contact.position}</p>
          <p className="contact-department">{contact.department}</p>
        </div>

        <div className="modal-body">
          <div className="detail-item">
            <div className="detail-icon">📧</div>
            <div className="detail-content">
              <label>Email</label>
              <p>{contact.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">📱</div>
            <div className="detail-content">
              <label>Phone</label>
              <p>{contact.phone}</p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn primary">
              📞 Call
            </button>
            <button className="action-btn secondary">
              ✉️ Message
            </button>
            <button className="action-btn delete" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;