import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TablePagination,
  IconButton,
  Toolbar,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersTab: React.FC = () => {
  const theme = useTheme();
  
  // Expanded sample data with more users
  const initialUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Admin User', email: 'admin@example.com' },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 5, name: 'Bob Williams', email: 'bob@example.com' },
    { id: 6, name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: 7, name: 'Diana Prince', email: 'diana@example.com' },
    { id: 8, name: 'Ethan Hunt', email: 'ethan@example.com' },
    { id: 9, name: 'Fiona Green', email: 'fiona@example.com' },
    { id: 10, name: 'George Miller', email: 'george@example.com' },
    { id: 11, name: 'Hannah Baker', email: 'hannah@example.com' },
    { id: 12, name: 'Ian Cooper', email: 'ian@example.com' },
    { id: 13, name: 'Jessica Day', email: 'jessica@example.com' },
    { id: 14, name: 'Kevin Parker', email: 'kevin@example.com' },
    { id: 15, name: 'Lisa Ray', email: 'lisa@example.com' },
  ];

  // State management
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Fixed to 5 users per page
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(0);
  }, [searchTerm, users]);

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // CRUD operations
  const handleAddUser = () => {
    setCurrentUser({ id: 0, name: '', email: '' });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setOpenDeleteDialog(false);
      setUserToDelete(null);
    }
  };

  const handleSaveUser = () => {
    if (!currentUser) return;

    if (isEditing) {
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    } else {
      const newId = Math.max(...users.map(user => user.id)) + 1;
      setUsers([...users, { ...currentUser, id: newId }]);
    }
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value
    });
  };

  // Custom pagination actions
  const PaginationActions = () => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 0}
          size="small"
        >
          <KeyboardArrowLeft />
        </IconButton>
        {Array.from({ length: Math.ceil(filteredUsers.length / rowsPerPage) }, (_, i) => i).map((num) => (
          <Button
            key={num}
            variant={page === num ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleChangePage(null, num)}
            sx={{ minWidth: 32, height: 32 }}
          >
            {num + 1}
          </Button>
        ))}
        <IconButton
          onClick={() => handleChangePage(null, page + 1)}
          disabled={page >= Math.ceil(filteredUsers.length / rowsPerPage) - 1}
          size="small"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Toolbar with search and add button */}
      <Toolbar sx={{ p: '0 !important', mb: 2, gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search users..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <IconButton onClick={() => setSearchTerm('')} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          size="small"
        >
          Add User
        </Button>
      </Toolbar>

      {/* Compact Users Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          maxHeight: 'calc(5 * 52px + 56px)', // Height for 5 rows + header
          overflow: 'auto'
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} hover>
                <TableCell sx={{ py: 1 }}>{user.id}</TableCell>
                <TableCell sx={{ py: 1 }}>{user.name}</TableCell>
                <TableCell sx={{ py: 1 }}>{user.email}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton onClick={() => handleEditUser(user)} size="small">
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user.id)} size="small">
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Improved Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 1,
        p: 1,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 1
      }}>
        <Typography variant="body2" color="text.secondary">
          Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </Typography>
        <PaginationActions />
      </Box>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentUser?.name || ''}
              onChange={handleInputChange}
              margin="normal"
              size="small"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={currentUser?.email || ''}
              onChange={handleInputChange}
              margin="normal"
              size="small"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} size="small">Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary" size="small">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} size="small">Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            color="error"
            size="small"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTab;