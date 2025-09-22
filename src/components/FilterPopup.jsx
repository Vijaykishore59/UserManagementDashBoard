import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

export default function FilterPopup({ open, onClose, onApply, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    ...initialFilters
  });

  useEffect(() => setFilters({ ...initialFilters }), [initialFilters, open]);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => onApply(filters);
  const handleReset = () => setFilters({ firstName: '', lastName: '', email: '', department: '' });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Filter Users</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={filters.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={filters.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={filters.email}
              onChange={e => handleChange('email', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              value={filters.department}
              onChange={e => handleChange('department', e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
