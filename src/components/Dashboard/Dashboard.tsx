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
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { generateUsers, User } from '../../utils/generateUsers';
import {
  Person as PersonIcon,
  Group as GroupIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

interface Publisher {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  pdfFile?: string; // URL or file path to the PDF
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [users, setUsers] = useState<User[]>(generateUsers(50));
  const [publishers, setPublishers] = useState<Publisher[]>([
    {
      id: '1',
      name: 'Publisher One',
      email: 'publisher1@example.com',
      status: 'Active',
      pdfFile: 'https://example.com/sample.pdf',
    },
    {
      id: '2',
      name: 'Publisher Two',
      email: 'publisher2@example.com',
      status: 'Inactive',
      pdfFile: 'https://example.com/sample2.pdf',
    },
    {
      id: '3',
      name: 'Publisher Three',
      email: 'publisher3@example.com',
      status: 'Active',
      pdfFile: 'https://example.com/sample3.pdf',
    },
    {
      id: '4',
      name: 'Publisher Four',
      email: 'publisher4@example.com',
      status: 'Inactive',
      pdfFile: 'https://example.com/sample4.pdf',
    },
    {
      id: '5',
      name: 'Publisher Five',
      email: 'publisher5@example.com',
      status: 'Active',
      pdfFile: 'https://example.com/sample5.pdf',
    },
    {
      id: '6',
      name: 'Publisher Six',
      email: 'publisher6@example.com',
      status: 'Inactive',
      pdfFile: 'https://example.com/sample6.pdf',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openPdfModal, setOpenPdfModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);
  const [newUser, setNewUser] = useState<User>({ id: '', name: '', email: '' });
  const [newPublisher, setNewPublisher] = useState<Publisher>({
    id: '',
    name: '',
    email: '',
    status: 'Active',
    pdfFile: '',
  });
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const rowsPerPage = 6;

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle search for users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search for publishers
  const filteredPublishers = publishers.filter(
    (publisher) =>
      publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publisher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination for users
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle pagination for publishers
  const paginatedPublishers = filteredPublishers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle delete user
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  // Handle save edited user
  const handleSaveUser = (editedUser: User) => {
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

  // Handle status change for publishers
  const handleStatusChange = (id: string) => {
    setPublishers(
      publishers.map((publisher) =>
        publisher.id === id
          ? {
              ...publisher,
              status: publisher.status === 'Active' ? 'Inactive' : 'Active',
            }
          : publisher
      )
    );
  };

  // Handle delete publisher
  const handleDeletePublisher = (id: string) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      setPublishers(publishers.filter((publisher) => publisher.id !== id));
    }
  };

  // Handle edit publisher
  const handleEditPublisher = (publisher: Publisher) => {
    setSelectedPublisher(publisher);
    setOpenEditModal(true);
  };

  // Handle save edited publisher
  const handleSavePublisher = (editedPublisher: Publisher) => {
    setPublishers(
      publishers.map((publisher) =>
        publisher.id === editedPublisher.id ? editedPublisher : publisher
      )
    );
    setOpenEditModal(false);
  };

  // Handle add new publisher
  const handleAddPublisher = () => {
    setOpenAddModal(true);
  };

  // Handle save new publisher
  const handleSaveNewPublisher = () => {
    const publisherToAdd: Publisher = {
      id: String(publishers.length + 1),
      name: newPublisher.name,
      email: newPublisher.email,
      status: newPublisher.status,
      pdfFile: newPublisher.pdfFile,
    };
    setPublishers([...publishers, publisherToAdd]);
    setOpenAddModal(false);
    setNewPublisher({ id: '', name: '', email: '', status: 'Active', pdfFile: '' });
  };

  // Handle PDF view
  const handleViewPdf = (url: string) => {
    setPdfUrl(url);
    setOpenPdfModal(true);
  };

  // Handle PDF download
  const handleDownloadPdf = (url: string) => {
    window.open(url, '_blank');
  };

  // Handle PDF upload
  const handleUploadPdf = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const pdfUrl = e.target?.result as string;
        setPublishers(
          publishers.map((publisher) =>
            publisher.id === id ? { ...publisher, pdfFile: pdfUrl } : publisher
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle PDF delete
  const handleDeletePdf = (id: string) => {
    setPublishers(
      publishers.map((publisher) =>
        publisher.id === id ? { ...publisher, pdfFile: undefined } : publisher
      )
    );
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
            style: { backgroundColor: 'white' },
          }}
        >
          <Tab
            label="Users"
            icon={<PersonIcon />}
            iconPosition="start"
            sx={{ color: 'white', '&.Mui-selected': { color: 'white', bgcolor: 'primary.dark' } }}
          />
          <Tab
            label="Publishers"
            icon={<GroupIcon />}
            iconPosition="start"
            sx={{ color: 'white', '&.Mui-selected': { color: 'white', bgcolor: 'primary.dark' } }}
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
              sx={{ maxWidth: '100%', overflowX: 'auto', border: '1px solid #ddd' }}
            >
              <Table size="small">
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
                          onClick={() => handleEditUser(user)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteUser(user.id)}
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
              <Button variant="contained" color="primary" onClick={handleAddPublisher}>
                Add New Publisher
              </Button>
            </Box>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: '100%', overflowX: 'auto', border: '1px solid #ddd' }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Publisher ID</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Name</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Email</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Status</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>PDF Files</TableCell>
                    <TableCell sx={{ bgcolor: 'primary.main', color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPublishers.map((publisher) => (
                    <TableRow key={publisher.id} hover>
                      <TableCell>{publisher.id}</TableCell>
                      <TableCell>{publisher.name}</TableCell>
                      <TableCell>{publisher.email}</TableCell>
                      <TableCell>
                        <Switch
                          checked={publisher.status === 'Active'}
                          onChange={() => handleStatusChange(publisher.id)}
                          color="primary"
                        />
                        {publisher.status}
                      </TableCell>
                      <TableCell>
                        {publisher.pdfFile && (
                          <>
                            <IconButton onClick={() => handleViewPdf(publisher.pdfFile!)}>
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDownloadPdf(publisher.pdfFile!)}>
                              <GetAppIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeletePdf(publisher.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                        <input
                          type="file"
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          id={`upload-pdf-${publisher.id}`}
                          onChange={(e) => handleUploadPdf(e, publisher.id)}
                        />
                        <label htmlFor={`upload-pdf-${publisher.id}`}>
                          <IconButton component="span">
                            <CloudUploadIcon />
                          </IconButton>
                        </label>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditPublisher(publisher)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeletePublisher(publisher.id)}
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
              count={Math.ceil(filteredPublishers.length / rowsPerPage)}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
            />
          </>
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
            onClick={() => handleSaveUser(selectedUser!)}
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

      {/* PDF View Modal */}
      <Modal open={openPdfModal} onClose={() => setOpenPdfModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">PDF Viewer</Typography>
            <IconButton onClick={() => setOpenPdfModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="PDF Viewer"
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;