import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import SearchBar from './components/SearchBar/SearchBar';
import AddContactForm from './components/AddContactForm/AddContactForm';
import ContactModal from './components/ContactModal/ContactModal';
import Header from './components/Header/Header';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchAnimation, setSearchAnimation] = useState('');

  // Load contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contactList');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      const initialContacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0101', department: 'Engineering', position: 'Developer', avatarColor: '#6366f1' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0102', department: 'Marketing', position: 'Manager', avatarColor: '#10b981' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1-555-0103', department: 'Sales', position: 'Executive', avatarColor: '#f59e0b' }
      ];
      setContacts(initialContacts);
      localStorage.setItem('contactList', JSON.stringify(initialContacts));
    }
  }, []);

  // SIMPLE WORKING SEARCH
  const filteredContacts = contacts.filter(contact => {
    if (!searchTerm.trim()) return true;
    
    const search = searchTerm.toLowerCase();
    
    return (
      contact.name.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      contact.phone.includes(searchTerm) ||
      contact.department.toLowerCase().includes(search)
    );
  });

  const groupedContacts = {}; // Simplified for testing

  const addContact = (newContact) => {
    const colors = ['#6366f1', '#10b981', '#f59e0b'];
    const contact = {
      id: Date.now(),
      ...newContact,
      department: 'General',
      position: 'Team Member',
      avatarColor: colors[Math.floor(Math.random() * colors.length)]
    };
    
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    localStorage.setItem('contactList', JSON.stringify(updatedContacts));
    setShowAddForm(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Header 
          totalContacts={contacts.length}
          filteredCount={filteredContacts.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        <div className="app-controls">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <button className="add-contact-btn" onClick={() => setShowAddForm(!showAddForm)}>
            + Add Contact
          </button>
        </div>

        {showAddForm && <AddContactForm onAddContact={addContact} onCancel={() => setShowAddForm(false)} />}

        <ContactList contacts={{'A': filteredContacts}} onContactClick={handleContactClick} viewMode={viewMode} />

        {selectedContact && <ContactModal contact={selectedContact} onClose={closeModal} />}
      </div>
    </div>
  );
}

export default App;