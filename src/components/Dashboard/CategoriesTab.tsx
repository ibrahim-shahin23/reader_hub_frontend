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
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  CloudUpload as UploadIcon,
  Image as ImageIcon
} from '@mui/icons-material';

interface Category {
  id: number;
  name: string;
  image?: string;
}

const CategoriesTab: React.FC = () => {
  const theme = useTheme();
  
  // Sample categories data
  const initialCategories: Category[] = [
    { id: 1, name: 'Fiction', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 2, name: 'Non-Fiction', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 3, name: 'Science Fiction', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 4, name: 'Fantasy', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 5, name: 'Biography', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 6, name: 'History', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 7, name: 'Self-Help', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 8, name: 'Romance', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 9, name: 'Mystery', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 10, name: 'Thriller', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 11, name: 'Horror', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 12, name: 'Young Adult', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 13, name: 'Children', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 14, name: 'Poetry', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
    { id: 15, name: 'Drama', image: 'https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UF1000,1000_QL80_.jpg' },
  ];

  // State management
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter categories based on search term
  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setPage(0);
  }, [searchTerm, categories]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleAddCategory = () => {
    setCurrentCategory({
      id: 0,
      name: '',
      image: undefined
    });
    setIsEditing(false);
    setSelectedImage(null);
    setImagePreview(null);
    setErrors({});
    setOpenDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setSelectedImage(null);
    setImagePreview(category.image || null);
    setErrors({});
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(category => category.id !== categoryToDelete));
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors({...errors, image: 'Only JPG/PNG images are allowed'});
        return;
      }
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({...errors, image: 'Image size should not exceed 2MB'});
        return;
      }
      
      setErrors({...errors, image: ''});
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (currentCategory) {
      setCurrentCategory({...currentCategory, image: undefined});
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentCategory?.name || currentCategory.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCategory = () => {
    if (!currentCategory || !validateForm()) return;

    if (isEditing) {
      setCategories(categories.map(category => 
        category.id === currentCategory.id ? 
        { 
          ...currentCategory, 
          image: imagePreview || category.image 
        } : category
      ));
    } else {
      const newId = Math.max(...categories.map(category => category.id)) + 1;
      setCategories([...categories, { 
        ...currentCategory, 
        id: newId,
        image: imagePreview || undefined
      }]);
    }
    
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCategory) return;
    setCurrentCategory({
      ...currentCategory,
      [e.target.name]: e.target.value
    });
  };

  const PaginationControls = () => {
    const pageCount = Math.ceil(filteredCategories.length / rowsPerPage);
    const pages = Array.from({ length: pageCount }, (_, i) => i);

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
          size="small"
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        
        {pages.map(num => (
          <Button
            key={num}
            variant={page === num ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleChangePage(num)}
            sx={{ minWidth: 32, height: 32, borderRadius: '4px' }}
          >
            {num + 1}
          </Button>
        ))}
        
        <IconButton
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= pageCount - 1}
          size="small"
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar disableGutters sx={{ mb: 2, gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search categories..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: searchTerm && (
              <IconButton onClick={() => setSearchTerm('')} size="small" edge="end">
                <CloseIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{ flexGrow: 1, maxWidth: 400, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          size="small"
          sx={{ borderRadius: '8px', textTransform: 'none' }}
        >
          Add Category
        </Button>
      </Toolbar>

      <TableContainer component={Paper} sx={{ flex: 1, boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, borderRadius: '8px', overflow: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                <TableCell sx={{ py: 1 }}>{category.id}</TableCell>
                <TableCell sx={{ py: 1 }}>{category.name}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  {category.image ? (
                    <Avatar 
                      variant="rounded" 
                      src={category.image} 
                      sx={{ width: 40, height: 40 }} 
                    />
                  ) : (
                    <Chip label="No image" size="small" />
                  )}
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton onClick={() => handleEditCategory(category)} size="small" aria-label="edit">
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(category.id)} size="small" aria-label="delete">
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, backgroundColor: theme.palette.grey[50], borderRadius: '8px' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
        </Typography>
        <PaginationControls />
      </Box>

      {/* Add/Edit Category Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <EditIcon color="primary" />
          {isEditing ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3, mt:1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt:1 }}>
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              value={currentCategory?.name || ''}
              onChange={handleInputChange}
              size="medium"
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Category Image
              </Typography>
              
              <Box sx={{ 
                border: `1px dashed ${theme.palette.divider}`,
                borderRadius: 1,
                p: 2,
                mb: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 150
              }}>
                {imagePreview ? (
                  <Box sx={{ position: 'relative', textAlign: 'center' }}>
                    <Avatar
                      variant="rounded"
                      src={imagePreview}
                      sx={{ width: 120, height: 120, mb: 1 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<CloseIcon />}
                      onClick={removeImage}
                      sx={{ mt: 1 }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    py: 2,
                    textAlign: 'center'
                  }}>
                    <UploadIcon fontSize="large" color="action" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      No image selected
                    </Typography>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<ImageIcon />}
                      size="medium"
                    >
                      Upload Image
                      <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/png"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Box>
                )}
              </Box>
              
              {errors.image && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors.image}
                </Typography>
              )}
              
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                JPG or PNG, max 2MB
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`
        }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            size="medium"
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveCategory} 
            variant="contained" 
            color="primary"
            size="medium"
            sx={{ minWidth: 100 }}
            disabled={!!errors.name || !!errors.image}
          >
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <DeleteIcon color="error" />
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {categoryToDelete && categories.find(c => c.id === categoryToDelete)?.image && (
              <Avatar 
                variant="rounded"
                src={categories.find(c => c.id === categoryToDelete)?.image}
                sx={{ width: 60, height: 60 }}
              />
            )}
            <Box>
              <Typography variant="h6">
                {categoryToDelete ? categories.find(c => c.id === categoryToDelete)?.name : ''}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {categoryToDelete}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <DialogContentText>
            Are you sure you want to permanently delete this category? This action cannot be undone.
          </DialogContentText>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Warning: Books associated with this category may need to be reassigned.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`
        }}>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            variant="outlined"
            size="medium"
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            size="medium"
            sx={{ minWidth: 100 }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesTab;