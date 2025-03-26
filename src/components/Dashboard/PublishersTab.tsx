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
  IconButton,
  Toolbar,
  InputAdornment,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Link,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PictureAsPdf as PdfIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteFileIcon,
  Visibility as ViewIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';

interface Publisher {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  pdfFiles: PdfFile[];
}

interface PdfFile {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
}

const PublishersTab: React.FC = () => {
  const theme = useTheme();
  
  // Sample data with publishers
  const initialPublishers: Publisher[] = [
    { 
      id: 1, 
      name: 'Tech Publications', 
      email: 'tech@example.com', 
      status: 'active',
      pdfFiles: [
        { id: 1, name: 'Tech Trends 2023.pdf', url: '#', uploadDate: '2023-05-15' },
        { id: 2, name: 'AI Advancements.pdf', url: '#', uploadDate: '2023-06-20' }
      ]
    },
    { 
      id: 2, 
      name: 'Science Digest', 
      email: 'science@example.com', 
      status: 'active',
      pdfFiles: [
        { id: 3, name: 'Quantum Physics.pdf', url: '#', uploadDate: '2023-04-10' }
      ]
    },
    { 
      id: 3, 
      name: 'Business Weekly', 
      email: 'business@example.com', 
      status: 'inactive',
      pdfFiles: []
    },
    { 
      id: 4, 
      name: 'Health Journal', 
      email: 'health@example.com', 
      status: 'active',
      pdfFiles: [
        { id: 4, name: 'Nutrition Guide.pdf', url: '#', uploadDate: '2023-07-05' },
        { id: 5, name: 'Exercise Routines.pdf', url: '#', uploadDate: '2023-07-12' }
      ]
    },
    { 
      id: 5, 
      name: 'Education Today', 
      email: 'education@example.com', 
      status: 'inactive',
      pdfFiles: []
    },
    { 
      id: 6, 
      name: 'Finance Insights', 
      email: 'finance@example.com', 
      status: 'active',
      pdfFiles: [
        { id: 6, name: 'Market Analysis.pdf', url: '#', uploadDate: '2023-08-01' }
      ]
    },
    { 
      id: 7, 
      name: 'Travel Chronicles', 
      email: 'travel@example.com', 
      status: 'active',
      pdfFiles: []
    },
    { 
      id: 8, 
      name: 'Art & Culture', 
      email: 'art@example.com', 
      status: 'inactive',
      pdfFiles: [
        { id: 7, name: 'Modern Art.pdf', url: '#', uploadDate: '2023-03-18' }
      ]
    },
    { 
      id: 9, 
      name: 'Sports Network', 
      email: 'sports@example.com', 
      status: 'active',
      pdfFiles: []
    },
    { 
      id: 10, 
      name: 'Food Magazine', 
      email: 'food@example.com', 
      status: 'active',
      pdfFiles: [
        { id: 8, name: 'Recipes Collection.pdf', url: '#', uploadDate: '2023-09-10' },
        { id: 9, name: 'Cooking Tips.pdf', url: '#', uploadDate: '2023-09-15' }
      ]
    },
  ];

  // State management
  const [publishers, setPublishers] = useState<Publisher[]>(initialPublishers);
  const [filteredPublishers, setFilteredPublishers] = useState<Publisher[]>(initialPublishers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPublisher, setCurrentPublisher] = useState<Publisher | null>(null);
  const [publisherToDelete, setPublisherToDelete] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  // Filter publishers based on search term
  useEffect(() => {
    const filtered = publishers.filter(publisher =>
      publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publisher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPublishers(filtered);
    setPage(0);
  }, [searchTerm, publishers]);

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // CRUD operations
  const handleAddPublisher = () => {
    setCurrentPublisher({ 
      id: 0, 
      name: '', 
      email: '', 
      status: 'active',
      pdfFiles: [] 
    });
    setIsEditing(false);
    setSelectedFiles([]);
    setOpenDialog(true);
  };

  const handleEditPublisher = (publisher: Publisher) => {
    setCurrentPublisher(publisher);
    setIsEditing(true);
    setSelectedFiles([]);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: number) => {
    setPublisherToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (publisherToDelete) {
      setPublishers(publishers.filter(publisher => publisher.id !== publisherToDelete));
      setOpenDeleteDialog(false);
      setPublisherToDelete(null);
    }
  };

  const handleSavePublisher = () => {
    if (!currentPublisher) return;

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(currentPublisher.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate required fields
    if (!currentPublisher.name || !currentPublisher.email) {
      alert('Name and Email are required fields');
      return;
    }

    if (isEditing) {
      // Update existing publisher
      setPublishers(publishers.map(publisher => 
        publisher.id === currentPublisher.id ? currentPublisher : publisher
      ));
    } else {
      // Add new publisher
      const newId = Math.max(...publishers.map(publisher => publisher.id)) + 1;
      setPublishers([...publishers, { ...currentPublisher, id: newId }]);
    }
    
    // In a real app, you would upload files to a server here
    if (selectedFiles.length > 0) {
      alert(`${selectedFiles.length} PDF files would be uploaded in a real application`);
    }
    
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPublisher) return;
    setCurrentPublisher({
      ...currentPublisher,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = (e: any) => {
    if (!currentPublisher) return;
    setCurrentPublisher({
      ...currentPublisher,
      status: e.target.value as 'active' | 'inactive'
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(file => file.type !== 'application/pdf');
    
    if (invalidFiles.length > 0) {
      setFileUploadError('Only PDF files are allowed');
      return;
    }
    
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024); // 5MB limit
    
    if (oversizedFiles.length > 0) {
      setFileUploadError('File size should not exceed 5MB');
      return;
    }
    
    setFileUploadError(null);
    setSelectedFiles(files);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const removeUploadedFile = (fileId: number) => {
    if (!currentPublisher) return;
    setCurrentPublisher({
      ...currentPublisher,
      pdfFiles: currentPublisher.pdfFiles.filter(file => file.id !== fileId)
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
        {Array.from({ length: Math.ceil(filteredPublishers.length / rowsPerPage) }, (_, i) => i).map((num) => (
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
          disabled={page >= Math.ceil(filteredPublishers.length / rowsPerPage) - 1}
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
          placeholder="Search publishers..."
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
          onClick={handleAddPublisher}
          size="small"
        >
          Add Publisher
        </Button>
      </Toolbar>

      {/* Publishers Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          maxHeight: 'calc(5 * 52px + 56px)',
          overflow: 'auto'
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>PDF Files</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPublishers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((publisher) => (
              <TableRow key={publisher.id} hover>
                <TableCell sx={{ py: 1 }}>{publisher.id}</TableCell>
                <TableCell sx={{ py: 1 }}>{publisher.name}</TableCell>
                <TableCell sx={{ py: 1 }}>{publisher.email}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Chip 
                    label={publisher.status} 
                    color={publisher.status === 'active' ? 'success' : 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  {publisher.pdfFiles.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {publisher.pdfFiles.slice(0, 2).map(file => (
                        <Chip
                          key={file.id}
                          icon={<PdfIcon />}
                          label={file.name}
                          variant="outlined"
                          size="small"
                          onClick={() => window.open(file.url, '_blank')}
                          onDelete={() => {}}
                          deleteIcon={<ViewIcon fontSize="small" />}
                        />
                      ))}
                      {publisher.pdfFiles.length > 2 && (
                        <Chip 
                          label={`+${publisher.pdfFiles.length - 2} more`} 
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">No files</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton onClick={() => handleEditPublisher(publisher)} size="small">
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(publisher.id)} size="small">
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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
          Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredPublishers.length)} of {filteredPublishers.length} publishers
        </Typography>
        <PaginationActions />
      </Box>

      {/* Add/Edit Publisher Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Publisher' : 'Add New Publisher'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentPublisher?.name || ''}
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
              value={currentPublisher?.email || ''}
              onChange={handleInputChange}
              margin="normal"
              size="small"
              required
            />
            
            {!isEditing && (
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                size="small"
                required
                helperText="Password is only required when creating a new publisher"
              />
            )}
            
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={currentPublisher?.status || 'active'}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                PDF Files
              </Typography>
              
              {/* Uploaded files */}
              {currentPublisher?.pdfFiles && currentPublisher.pdfFiles.length > 0 && (
                <List dense sx={{ mb: 2 }}>
                  {currentPublisher.pdfFiles.map(file => (
                    <ListItem 
                      key={file.id}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          onClick={() => removeUploadedFile(file.id)}
                          size="small"
                        >
                          <DeleteFileIcon fontSize="small" color="error" />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <PdfIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={file.name} 
                        secondary={`Uploaded: ${file.uploadDate}`}
                      />
                      <IconButton 
                        onClick={() => window.open(file.url, '_blank')}
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        onClick={() => window.open(file.url, '_blank')}
                        size="small"
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              )}
              
              {/* New file upload */}
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                size="small"
                sx={{ mr: 2 }}
              >
                Upload PDF
                <input
                  type="file"
                  hidden
                  multiple
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />
              </Button>
              
              {fileUploadError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {fileUploadError}
                </Typography>
              )}
              
              {/* Selected files preview */}
              {selectedFiles.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Files to upload:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {selectedFiles.map((file, index) => (
                      <Chip
                        key={index}
                        icon={<PdfIcon />}
                        label={file.name}
                        onDelete={() => removeSelectedFile(index)}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} size="small">Cancel</Button>
          <Button onClick={handleSavePublisher} variant="contained" color="primary" size="small">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this publisher? This action cannot be undone.
            {publisherToDelete && (
              <>
                <br />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Note: {publishers.find(p => p.id === publisherToDelete)?.pdfFiles.length || 0} associated PDF files will also be removed.
                </Typography>
              </>
            )}
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

export default PublishersTab;