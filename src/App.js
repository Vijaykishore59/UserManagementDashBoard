import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import FilterPopup from './components/FilterPopup';
import { fetchUsers, updateUser, deleteUser } from './api/usersApi';
import { 
  Button, CircularProgress, Container, Snackbar, Alert, Typography, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';

export default function App() {
  const [apiUsers, setApiUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success', action: null });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, userId: null });
  const [confirmAdd, setConfirmAdd] = useState({ open: false, userData: null });
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [lastAction, setLastAction] = useState(null); // For Undo

  // Set browser tab title and favicon dynamically
  useEffect(() => {
    document.title = "User Management Dashboard";
    const link = document.querySelector("link[rel~='icon']");
    if (link) link.href = '/favicon.ico'; // Place your favicon.ico in public folder
  }, []);

  // Load local users + API users
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]');
    setLocalUsers(storedUsers);

    const loadApiUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setApiUsers(data);
      } catch (err) {
        setToast({ open: true, message: 'Failed to load users', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadApiUsers();
  }, []);

  // Save localUsers to localStorage
  useEffect(() => {
    localStorage.setItem('addedUsers', JSON.stringify(localUsers));
  }, [localUsers]);

  // Add/Edit
  const handleSave = (user, id) => {
    if (id) {
      // Editing existing user
      if (id > 10) {
        // Local user
        setLocalUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
        setToast({ open: true, message: 'User updated successfully', severity: 'success' });
      } else {
        // API user
        updateUser(user, id).then(() => {
          setApiUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
          setToast({ open: true, message: 'User updated successfully', severity: 'success' });
        }).catch(() => {
          setToast({ open: true, message: 'Failed to update user', severity: 'error' });
        });
      }
    } else {
      // Adding new user
      const maxId = Math.max(0, ...apiUsers.map(u => u.id), ...localUsers.map(u => u.id));
      const newUser = { ...user, id: maxId + 1 };
      setLocalUsers(prev => [newUser, ...prev]);
      setLastAction({ type: 'add', user: newUser });
      setToast({ open: true, message: 'User added', severity: 'success', action: 'undo' });
    }
  };

  // Delete
  const handleDeleteClick = (id) => setConfirmDelete({ open: true, userId: id });
  const handleConfirmDelete = async () => {
    const id = confirmDelete.userId;
    let deletedUser = null;

    try {
      if (id > 10) {
        deletedUser = localUsers.find(u => u.id === id);
        setLocalUsers(prev => prev.filter(u => u.id !== id));
      } else {
        deletedUser = apiUsers.find(u => u.id === id);
        await deleteUser(id);
        setApiUsers(prev => prev.filter(u => u.id !== id));
      }
      setLastAction({ type: 'delete', user: deletedUser });
      setToast({ open: true, message: 'User deleted', severity: 'warning', action: 'undo' });
    } catch {
      setToast({ open: true, message: 'Failed to delete user', severity: 'error', action: null });
    } finally {
      setConfirmDelete({ open: false, userId: null });
    }
  };

  // Undo
  const handleUndo = () => {
    if (!lastAction) return;
    if (lastAction.type === 'add') {
      setLocalUsers(prev => prev.filter(u => u.id !== lastAction.user.id));
    } else if (lastAction.type === 'delete') {
      if (lastAction.user.id > 10) {
        setLocalUsers(prev => [lastAction.user, ...prev]);
      } else {
        setApiUsers(prev => [lastAction.user, ...prev]);
      }
    }
    setToast({ open: false, message: '', severity: 'success', action: null });
    setLastAction(null);
  };

  const combinedUsers = [...localUsers, ...apiUsers];

  // Apply filters
  const filteredUsers = combinedUsers.filter(u => {
    const names = u.name?.split(' ') || ['', ''];
    const firstName = names[0].toLowerCase();
    const lastName = names.slice(1).join(' ').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const dept = (u.company?.name || '').toLowerCase();

    return (
      (!filters.firstName || firstName.includes(filters.firstName.toLowerCase())) &&
      (!filters.lastName || lastName.includes(filters.lastName.toLowerCase())) &&
      (!filters.email || email.includes(filters.email.toLowerCase())) &&
      (!filters.department || dept.includes(filters.department.toLowerCase()))
    );
  });

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', marginTop:'50px' }}>
      <CircularProgress />
    </div>
  );

  return (
    <Container sx={{ mt: 4 }}>
      {/* Professional Header */}
      <Container sx={{ py: 3, mb: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold' }}>
          User Management Dashboard
        </Typography>
      </Container>

      <Button variant="contained" color="primary" sx={{ mr: 2, mb: 2 }}
        onClick={() => { setEditingUser(null); setShowForm(true); }}>Add User</Button>

      <Button variant="outlined" color="secondary" sx={{ mb: 2 }}
        onClick={() => setFilterPopupOpen(true)}>Filter</Button>

      <UserList
        users={filteredUsers}
        onEdit={(u) => { setEditingUser(u); setShowForm(true); }}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Form */}
      {showForm && <UserForm initial={editingUser} onClose={() => setShowForm(false)} onSave={handleSave} />}

      {/* Delete Confirmation */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open:false, userId:null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open:false, userId:null })}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Add Confirmation */}
      <Dialog open={confirmAdd.open} onClose={() => setConfirmAdd({ open:false, userData:null })}>
        <DialogTitle>Confirm Add</DialogTitle>
        <DialogContent>Are you sure you want to add this new user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmAdd({ open:false, userData:null })}>Cancel</Button>
          <Button color="primary" onClick={() => handleSave(confirmAdd.userData)}>Add User</Button>
        </DialogActions>
      </Dialog>

      {/* Filter Popup */}
      <FilterPopup
        open={filterPopupOpen}
        onClose={() => setFilterPopupOpen(false)}
        initialFilters={filters}
        onApply={(appliedFilters) => { setFilters(appliedFilters); setFilterPopupOpen(false); }}
      />

      {/* Snackbar with Undo */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          toast.action === 'undo' ? (
            <Button color="inherit" size="small" onClick={handleUndo}>
              UNDO
            </Button>
          ) : null
        }
      >
        <Alert 
          severity={toast.severity} 
          sx={{ width: '100%' }} 
          variant="filled"
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
