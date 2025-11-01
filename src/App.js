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

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('contactList');
    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      const initialContacts = [
        { 
          id: 1, 
          name: 'John Doe', 
          email: 'john.doe@company.com', 
          phone: '+1 (555) 010-1001',
          department: 'Engineering',
          position: 'Senior Developer',
          avatarColor: '#6366f1'
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          email: 'jane.smith@company.com', 
          phone: '+1 (555) 010-1002',
          department: 'Marketing',
          position: 'Marketing Director',
          avatarColor: '#10b981'
        },
        { 
          id: 3, 
          name: 'Mike Johnson', 
          email: 'mike.j@techcorp.com', 
          phone: '+1 (555) 010-1003',
          department: 'Sales',
          position: 'Sales Manager',
          avatarColor: '#f59e0b'
        },
        { 
          id: 4, 
          name: 'Sarah Wilson', 
          email: 'sarah.wilson@design.com', 
          phone: '+1 (555) 010-1004',
          department: 'Design',
          position: 'UI/UX Designer',
          avatarColor: '#8b5cf6'
        },
        { 
          id: 5, 
          name: 'David Brown', 
          email: 'david.b@finance.com', 
          phone: '+1 (555) 010-1005',
          department: 'Finance',
          position: 'Financial Analyst',
          avatarColor: '#ef4444'
        },
        { 
          id: 6, 
          name: 'Emily Davis', 
          email: 'emily.davis@hr.com', 
          phone: '+1 (555) 010-1006',
          department: 'Human Resources',
          position: 'HR Manager',
          avatarColor: '#06b6d4'
        },
        { 
          id: 7, 
          name: 'Robert Miller', 
          email: 'robert.m@ops.com', 
          phone: '+1 (555) 010-1007',
          department: 'Operations',
          position: 'Operations Lead',
          avatarColor: '#84cc16'
        },
        { 
          id: 8, 
          name: 'Lisa Garcia', 
          email: 'lisa.garcia@tech.com', 
          phone: '+1 (555) 010-1008',
          department: 'Engineering',
          position: 'DevOps Engineer',
          avatarColor: '#f97316'
        },
        { 
          id: 9, 
          name: 'Alex Thompson', 
          email: 'alex.t@data.com', 
          phone: '+1 (555) 010-1009',
          department: 'Data Science',
          position: 'Data Scientist',
          avatarColor: '#ec4899'
        },
        { 
          id: 10, 
          name: 'Amanda Lee', 
          email: 'amanda.lee@product.com', 
          phone: '+1 (555) 010-1010',
          department: 'Product',
          position: 'Product Manager',
          avatarColor: '#14b8a6'
        }
      ];
      setContacts(initialContacts);
      localStorage.setItem('contactList', JSON.stringify(initialContacts));
    }
  }, []);

  // Group contacts by first letter for dictionary style
  const groupContactsByLetter = (contacts) => {
    const grouped = {};
    contacts.forEach(contact => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(contact);
    });
    
    return Object.keys(grouped)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = grouped[key].sort((a, b) => a.name.localeCompare(b.name));
        return sorted;
      }, {});
  };

  // Enhanced search functionality - searches name, email, department, and phone numbers
  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase().trim();
    
    if (!searchLower) return true; // Show all if search is empty

    // Clean phone numbers for better matching (remove non-digits)
    const phoneClean = contact.phone.replace(/\D/g, '');
    const searchClean = searchTerm.replace(/\D/g, '');
    
    // Check name (case insensitive)
    const nameMatch = contact.name.toLowerCase().includes(searchLower);
    
    // Check email (case insensitive)
    const emailMatch = contact.email.toLowerCase().includes(searchLower);
    
    // Check department (case insensitive)
    const departmentMatch = contact.department.toLowerCase().includes(searchLower);
    
    // Check phone number (multiple ways)
    const phoneExactMatch = contact.phone.includes(searchTerm);
    const phoneCleanMatch = searchClean && phoneClean.includes(searchClean);
    const phoneCaseInsensitive = contact.phone.toLowerCase().includes(searchLower);
    
    return (
      nameMatch ||
      emailMatch ||
      departmentMatch ||
      phoneExactMatch ||
      phoneCleanMatch ||
      phoneCaseInsensitive
    );
  });

  const groupedContacts = groupContactsByLetter(filteredContacts);

  // Search animation logic
  useEffect(() => {
    if (searchTerm) {
      if (filteredContacts.length > 0) {
        setSearchAnimation('found');
        setTimeout(() => setSearchAnimation(''), 2000);
      } else {
        setSearchAnimation('not-found');
        setTimeout(() => setSearchAnimation(''), 2000);
      }
    }
  }, [filteredContacts.length, searchTerm]);

  const addContact = (newContact) => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#14b8a6'];
    const contact = {
      id: Date.now(), // Use timestamp for unique ID
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

  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    localStorage.setItem('contactList', JSON.stringify(updatedContacts));
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
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <div className="control-buttons">
            <button 
              className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ◼️ Grid
            </button>
            <button 
              className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰ List
            </button>
            <button 
              className="add-contact-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <span className="btn-icon">+</span>
              Add Contact
            </button>
          </div>
        </div>

        {showAddForm && (
          <AddContactForm 
            onAddContact={addContact} 
            onCancel={() => setShowAddForm(false)} 
          />
        )}

        <ContactList 
          contacts={groupedContacts} 
          onContactClick={handleContactClick}
          viewMode={viewMode}
        />
        
        {Object.keys(groupedContacts).length === 0 && (
          <div className="empty-state">
            <div className={`empty-icon ${searchAnimation}`}>
              {searchTerm ? '👎' : '🤝'}
            </div>
            <h3>
              {searchTerm ? `No contacts found for "${searchTerm}"` : 'No contacts yet'}
            </h3>
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {selectedContact && (
          <ContactModal 
            contact={selectedContact} 
            onClose={closeModal}
            onDelete={deleteContact}
          />
        )}
      </div>
    </div>
  );
}

export default App;