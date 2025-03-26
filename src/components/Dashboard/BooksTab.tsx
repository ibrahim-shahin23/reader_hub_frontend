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
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Avatar,
  Chip,
  Grid,
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
  CloudUpload,
  Image as ImageIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

interface Author {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  discount?: number;
  publishingDate: Date;
  author: Author;
  status: boolean;
  images: string[];
}

const BooksTab: React.FC = () => {
  const theme = useTheme();
  
  // Sample authors data
  const authors: Author[] = [
    { id: 1, name: 'Paulo Coelho' },
    { id: 2, name: 'J.K. Rowling' },
    { id: 3, name: 'J.R.R. Tolkien' },
    { id: 4, name: 'C.S. Lewis' },
    { id: 5, name: 'Harper Lee' },
    { id: 6, name: 'Markus Zusak' },
    { id: 7, name: 'Khaled Hosseini' },
    { id: 8, name: 'Antoine de Saint-Exupéry' },
    { id: 9, name: 'George Orwell' },
    { id: 10, name: 'Jane Austen' }
  ];

  // Sample books data (15 family-friendly books)
  const initialBooks: Book[] = [
    {
      id: 1,
      title: 'The Alchemist',
      description: 'A shepherd boy travels from Spain to Egypt in search of treasure and his personal legend.',
      price: 12.99,
      discount: 1.50,
      publishingDate: new Date('1988-01-01'),
      author: authors[0],
      status: true,
      images: ['https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 2,
      title: 'Harry Potter and the Sorcerer\'s Stone',
      description: 'A young boy discovers he\'s a wizard and begins his education at Hogwarts School of Witchcraft and Wizardry.',
      price: 14.99,
      publishingDate: new Date('1997-06-26'),
      author: authors[1],
      status: true,
      images: ['https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 3,
      title: 'The Hobbit',
      description: 'A hobbit goes on an adventure with dwarves to reclaim their mountain home from a dragon.',
      price: 13.50,
      discount: 2.00,
      publishingDate: new Date('1937-09-21'),
      author: authors[2],
      status: true,
      images: ['https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 4,
      title: 'The Lion, the Witch and the Wardrobe',
      description: 'Four siblings discover a magical world through a wardrobe and help defeat an evil witch.',
      price: 10.99,
      publishingDate: new Date('1950-10-16'),
      author: authors[3],
      status: true,
      images: ['https://m.media-amazon.com/images/I/51j6bFkLsSL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 5,
      title: 'To Kill a Mockingbird',
      description: 'A young girl learns about racism and injustice in the American South during the Great Depression.',
      price: 11.25,
      publishingDate: new Date('1960-07-11'),
      author: authors[4],
      status: true,
      images: ['https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 6,
      title: 'The Book Thief',
      description: 'A young girl in Nazi Germany finds solace by stealing books and sharing them with others.',
      price: 12.75,
      discount: 1.25,
      publishingDate: new Date('2005-03-14'),
      author: authors[5],
      status: true,
      images: ['https://m.media-amazon.com/images/I/81bsw6P3hjL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 7,
      title: 'The Kite Runner',
      description: 'A story of friendship, betrayal, and redemption set in Afghanistan and America.',
      price: 13.99,
      publishingDate: new Date('2003-05-29'),
      author: authors[6],
      status: true,
      images: ['https://m.media-amazon.com/images/I/81o1s+Wwq4L._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 8,
      title: 'The Little Prince',
      description: 'A pilot stranded in the desert meets a young prince visiting from another planet.',
      price: 9.99,
      discount: 0.99,
      publishingDate: new Date('1943-04-06'),
      author: authors[7],
      status: true,
      images: ['https://m.media-amazon.com/images/I/71QEQV4WYpL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 9,
      title: 'Animal Farm',
      description: 'A satirical allegory about farm animals who rebel against their human farmer.',
      price: 8.50,
      publishingDate: new Date('1945-08-17'),
      author: authors[8],
      status: true,
      images: ['https://m.media-amazon.com/images/I/91LUbAcpACL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 10,
      title: 'Pride and Prejudice',
      description: 'The romantic story of Elizabeth Bennet and Mr. Darcy in 19th century England.',
      price: 10.25,
      discount: 1.50,
      publishingDate: new Date('1813-01-28'),
      author: authors[9],
      status: true,
      images: ['https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 11,
      title: 'The Secret Garden',
      description: 'A spoiled girl discovers a hidden garden that changes her life and those around her.',
      price: 9.75,
      publishingDate: new Date('1911-01-01'),
      author: { id: 11, name: 'Frances Hodgson Burnett' },
      status: true,
      images: ['https://m.media-amazon.com/images/I/91+VyV0K3fL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 12,
      title: 'Charlotte\'s Web',
      description: 'A spider saves the life of a pig through her clever web messages.',
      price: 8.99,
      publishingDate: new Date('1952-10-15'),
      author: { id: 12, name: 'E.B. White' },
      status: true,
      images: ['https://m.media-amazon.com/images/I/91VokXkn8hL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 13,
      title: 'Wonder',
      description: 'A boy with facial differences attends school for the first time and teaches others about kindness.',
      price: 12.99,
      discount: 2.00,
      publishingDate: new Date('2012-02-14'),
      author: { id: 13, name: 'R.J. Palacio' },
      status: true,
      images: ['https://m.media-amazon.com/images/I/71KilybDOoL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 14,
      title: 'The Chronicles of Narnia: Prince Caspian',
      description: 'The Pevensie children return to Narnia to help Prince Caspian reclaim his throne.',
      price: 11.50,
      publishingDate: new Date('1951-10-15'),
      author: authors[3],
      status: true,
      images: ['https://m.media-amazon.com/images/I/91QlW5mU5LL._AC_UF1000,1000_QL80_.jpg']
    },
    {
      id: 15,
      title: 'Matilda',
      description: 'A brilliant little girl with magical powers stands up to her cruel parents and headmistress.',
      price: 10.99,
      discount: 1.25,
      publishingDate: new Date('1988-10-01'),
      author: { id: 14, name: 'Roald Dahl' },
      status: true,
      images: ['https://m.media-amazon.com/images/I/91E1W6RfZEL._AC_UF1000,1000_QL80_.jpg']
    }
  ];

  // State management
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
    setPage(0);
  }, [searchTerm, books]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleAddBook = () => {
    setCurrentBook({
      id: 0,
      title: '',
      description: '',
      price: 0,
      discount: undefined,
      publishingDate: new Date(),
      author: authors[0],
      status: true,
      images: []
    });
    setIsEditing(false);
    setSelectedImages([]);
    setImagePreviews([]);
    setErrors({});
    setOpenDialog(true);
  };

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
    setIsEditing(true);
    setSelectedImages([]);
    setImagePreviews(book.images);
    setErrors({});
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: number) => {
    setBookToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(book => book.id !== bookToDelete));
      setOpenDeleteDialog(false);
      setBookToDelete(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => 
        ['image/jpeg', 'image/png'].includes(file.type) && file.size <= 2 * 1024 * 1024
      );
      
      setSelectedImages(validFiles);
      
      const previews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    
    if (index < imagePreviews.length - selectedImages.length) {
      if (currentBook) {
        const newImages = [...currentBook.images];
        newImages.splice(index, 1);
        setCurrentBook({ ...currentBook, images: newImages });
      }
    } else {
      const newSelected = [...selectedImages];
      newSelected.splice(index - (imagePreviews.length - selectedImages.length), 1);
      setSelectedImages(newSelected);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentBook?.title || currentBook.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    
    if (!currentBook?.description || currentBook.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }
    
    if (!currentBook?.price || isNaN(currentBook.price)) {
      newErrors.price = 'Price must be a valid number';
    }
    
    if (currentBook?.discount && isNaN(currentBook.discount)) {
      newErrors.discount = 'Discount must be a valid number';
    }
    
    if (!currentBook?.publishingDate) {
      newErrors.publishingDate = 'Publishing date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveBook = () => {
    if (!currentBook || !validateForm()) return;

    const updatedImages = [...currentBook.images, ...selectedImages.map(() => 'placeholder_url')];
    
    if (isEditing) {
      setBooks(books.map(book => book.id === currentBook.id ? 
        { ...currentBook, images: updatedImages } : book));
    } else {
      const newId = Math.max(...books.map(book => book.id)) + 1;
      setBooks([...books, { ...currentBook, id: newId, images: updatedImages }]);
    }
    
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentBook) return;
    setCurrentBook({
      ...currentBook,
      [e.target.name]: e.target.value
    });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentBook) return;
    const value = parseFloat(e.target.value);
    setCurrentBook({
      ...currentBook,
      [e.target.name]: isNaN(value) ? undefined : value
    });
  };

  const PaginationControls = () => {
    const pageCount = Math.ceil(filteredBooks.length / rowsPerPage);
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
          placeholder="Search books..."
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
          onClick={handleAddBook}
          size="small"
          sx={{ borderRadius: '8px', textTransform: 'none' }}
        >
          Add Book
        </Button>
      </Toolbar>

      <TableContainer component={Paper} sx={{ flex: 1, boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, borderRadius: '8px', overflow: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Discount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Publishing Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
              <TableRow key={book.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                <TableCell sx={{ py: 1 }}>{book.id}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.title}</TableCell>
                <TableCell sx={{ py: 1 }}>${book.price.toFixed(2)}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.discount ? `$${book.discount.toFixed(2)}` : '-'}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.author.name}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.publishingDate.toLocaleDateString()}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Chip label={book.status ? 'Active' : 'Inactive'} size="small" color={book.status ? 'success' : 'error'} />
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton onClick={() => handleEditBook(book)} size="small" aria-label="edit">
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(book.id)} size="small" aria-label="delete">
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
          Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredBooks.length)} of {filteredBooks.length} books
        </Typography>
        <PaginationControls />
      </Box>

      {/* Enhanced Edit Book Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <EditIcon color="primary" />
          {isEditing ? 'Edit Book Details' : 'Add New Book'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt:1}}>
                <TextField
                  fullWidth
                  label="Book Title"
                  name="title"
                  value={currentBook?.title || ''}
                  onChange={handleInputChange}
                  size="medium"
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                  sx={{ mb: 1 }}
                />
                
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={currentBook?.description || ''}
                  onChange={handleInputChange}
                  required
                  error={!!errors.description}
                  helperText={errors.description}
                />
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={currentBook?.price || ''}
                    onChange={handleNumberInputChange}
                    size="medium"
                    required
                    error={!!errors.price}
                    helperText={errors.price}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Discount ($)"
                    name="discount"
                    type="number"
                    value={currentBook?.discount || ''}
                    onChange={handleNumberInputChange}
                    size="medium"
                    error={!!errors.discount}
                    helperText={errors.discount}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Publishing Date"
                      value={currentBook?.publishingDate || null}
                      onChange={(newValue) => {
                        if (currentBook && newValue) {
                          setCurrentBook({ ...currentBook, publishingDate: newValue });
                        }
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'medium',
                          error: !!errors.publishingDate,
                          helperText: errors.publishingDate,
                        }
                      }}
                    />
                  </LocalizationProvider>
                  
                  <FormControl fullWidth size="medium" error={!!errors.author}>
                    <InputLabel>Author</InputLabel>
                    <Select
                      value={currentBook?.author?.id || ''}
                      onChange={(e) => {
                        if (currentBook) {
                          const selectedAuthor = authors.find(a => a.id === e.target.value);
                          if (selectedAuthor) {
                            setCurrentBook({ ...currentBook, author: selectedAuthor });
                          }
                        }
                      }}
                      label="Author"
                    >
                      {authors.map(author => (
                        <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.author && <FormHelperText>{errors.author}</FormHelperText>}
                  </FormControl>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
                    Status:
                  </Typography>
                  <Switch
                    checked={currentBook?.status || false}
                    onChange={(e) => {
                      if (currentBook) {
                        setCurrentBook({ ...currentBook, status: e.target.checked });
                      }
                    }}
                    color="primary"
                    size="medium"
                  />
                  <Typography variant="body1" color={currentBook?.status ? 'success.main' : 'error.main'}>
                    {currentBook?.status ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                borderLeft: { md: `1px solid ${theme.palette.divider}` },
                pl: { md: 3 },
                pt: { xs: 3, md: 0 }
              }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, pt:1 }}>
                  <ImageIcon color="primary" />
                  Book Cover
                </Typography>
                
                <Box sx={{ 
                  border: `1px dashed ${theme.palette.divider}`,
                  borderRadius: 1,
                  p: 2,
                  mb: 2
                }}>
                  {imagePreviews.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {imagePreviews.map((preview, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                          <Avatar
                            variant="rounded"
                            src={preview}
                            sx={{ width: 120, height: 160 }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: theme.palette.error.main,
                              color: theme.palette.error.contrastText,
                              '&:hover': { backgroundColor: theme.palette.error.dark }
                            }}
                            onClick={() => removeImage(index)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      py: 4,
                      textAlign: 'center'
                    }}>
                      <CloudUpload fontSize="large" color="action" sx={{ mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        No images selected
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                <Button
                  component="label"
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudUpload />}
                  size="medium"
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                  />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                  JPG or PNG, max 2MB each
                </Typography>
              </Box>
            </Grid>
          </Grid>
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
            onClick={handleSaveBook} 
            variant="contained" 
            color="primary"
            size="medium"
            sx={{ minWidth: 100 }}
          >
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Delete Confirmation Dialog */}
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
            <Avatar 
              variant="rounded"
              src={bookToDelete ? books.find(b => b.id === bookToDelete)?.images[0] : ''}
              sx={{ width: 60, height: 80 }}
            />
            <Box>
              <Typography variant="h6">
                {bookToDelete ? books.find(b => b.id === bookToDelete)?.title : ''}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {bookToDelete ? books.find(b => b.id === bookToDelete)?.author.name : ''}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <DialogContentText>
            Are you sure you want to permanently delete this book? This action cannot be undone and will remove all associated data.
          </DialogContentText>
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

export default BooksTab;