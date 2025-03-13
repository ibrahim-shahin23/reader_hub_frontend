import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Modal,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { generateUsers, User } from '../../utils/generateUsers';
import {
  Person as PersonIcon,
  Group as GroupIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [users, setUsers] = useState<User[]>(generateUsers(50));
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({ id: '', name: '', email: '' });
  const rowsPerPage = 6; // Display only 6 users per page

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle delete user
  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Handle edit user
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  // Handle save edited user
  const handleSave = (editedUser: User) => {
    setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
    setOpenEditModal(false);
  };

  // Handle add new user
  const handleAddUser = () => {
    setOpenAddModal(true);
  };

  // Handle save new user
  const handleSaveNewUser = () => {
    const userToAdd: User = {
      id: String(users.length + 1),
      name: newUser.name,
      email: newUser.email,
    };
    setUsers([...users, userToAdd]);
    setOpenAddModal(false);
    setNewUser({ id: '', name: '', email: '' });
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Box sx={{ width: '200px', bgcolor: 'primary.main', color: 'white' }}>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
          TabIndicatorProps={{
            style: { backgroundColor: 'white' }, // Highlight color for the selected tab
          }}
        >
          <Tab
            label="Users"
            icon={<PersonIcon />}
            iconPosition="start"
            sx={{
              color: 'white',
              '&.Mui-selected': { color: 'white', bgcolor: 'primary.dark' }, // Highlight selected tab
            }}
          />
          <Tab
            label="Publishers"
            icon={<GroupIcon />}
            iconPosition="start"
            sx={{
              color: 'white',
              '&.Mui-selected': { color: 'white', bgcolor: 'primary.dark' }, // Highlight selected tab
            }}
          />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={3} bgcolor="#f5f5f5">
        {activeTab === 0 && (
          <>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <TextField
                label="Search by name or email"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: '300px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" color="primary" onClick={handleAddUser}>
                Add New User
              </Button>
            </Box>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: '100%', overflowX: 'auto', border: '1px solid #ddd' }} // Add border and make table fit to screen
            >
              <Table size="small"> {/* Make the table smaller */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>User ID</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>User Name</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Email</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(user)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
            />
          </>
        )}

        {activeTab === 1 && (
          <Typography variant="h5">Publishers Management (Coming Soon)</Typography>
        )}
      </Box>

      {/* Edit User Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Edit User</Typography>
            <IconButton onClick={() => setOpenEditModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Name"
            fullWidth
            value={selectedUser?.name || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={selectedUser?.email || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSave(selectedUser!)}
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Add New User Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add New User</Typography>
            <IconButton onClick={() => setOpenAddModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveNewUser}
            fullWidth
          >
            Add User
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;