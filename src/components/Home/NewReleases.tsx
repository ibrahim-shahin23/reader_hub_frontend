import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewReleases: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for 5 books with placeholder images
  const newReleases = [
    {
      id: '1',
      title: 'The Road to Recognition',
      author: 'Joyce Meyer',
      coverImage: 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SY425_.jpg',
      price: 24.99,
      rating: 4.5
    },
    {
      id: '2',
      title: 'The Mind Connection',
      author: 'Joyce Meyer',
      coverImage: 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SY425_.jpg',
      price: 19.99,
      rating: 4.2
    },
    {
      id: '3',
      title: 'Battlefield of the Mind',
      author: 'Joyce Meyer',
      coverImage: 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SY425_.jpg',
      price: 22.50,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Living Beyond Your Feelings',
      author: 'Joyce Meyer',
      coverImage: 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SY425_.jpg',
      price: 21.99,
      rating: 4.3
    },
    {
      id: '5',
      title: 'Power Thoughts',
      author: 'Joyce Meyer',
      coverImage: 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SY425_.jpg',
      price: 18.99,
      rating: 4.4
    }
  ];

  // Styles
  const styles = {
    section: {
      padding: '30px 20px',
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto'
    },
    heading: {
      textAlign: 'center' as const,
      fontSize: '24px',
      fontWeight: 'bold' as const,
      marginBottom: '25px',
      color: '#333333'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(180px, 1fr))', // Fixed 5 columns
      gap: '15px',
      padding: '0 10px',
      maxWidth: '1100px',
      margin: '0 auto'
    },
    bookCard: {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      overflow: 'hidden',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      textAlign: 'center' as const,
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
      }
    },
    bookImage: {
      width: '100%',
      height: '180px', // Reduced height
      objectFit: 'cover' as const,
      borderBottom: '1px solid #eeeeee'
    },
    bookInfo: {
      padding: '12px 8px' // Reduced padding
    },
    bookTitle: {
      fontSize: '14px', // Smaller font
      fontWeight: '600' as const,
      margin: '0 0 6px',
      color: '#333333',
      minHeight: '36px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    bookAuthor: {
      fontSize: '12px', // Smaller font
      color: '#666666',
      margin: '0 0 8px',
      fontStyle: 'italic'
    },
    bookPrice: {
      fontSize: '14px', // Smaller font
      fontWeight: 'bold' as const,
      color: '#e74c3c',
      margin: '8px 0 0'
    },
    button: {
      display: 'block',
      margin: '30px auto 0',
      padding: '10px 25px', // Smaller button
      fontSize: '14px',
      fontWeight: '600' as const,
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#2980b9',
        transform: 'translateY(-2px)'
      }
    },
    // Responsive styles
    '@media (max-width: 1024px)': {
      grid: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        maxWidth: '800px'
      }
    },
    '@media (max-width: 768px)': {
      grid: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px'
      },
      bookImage: {
        height: '160px'
      }
    },
    '@media (max-width: 480px)': {
      grid: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        maxWidth: '350px'
      }
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>New Release Books</h2>
      <div style={styles.grid}>
        {newReleases.map((book) => (
          <div 
            key={book.id} 
            style={styles.bookCard}
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <img 
              src={book.coverImage} 
              alt={book.title} 
              style={styles.bookImage} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/180x180?text=Book+Cover';
              }}
            />
            <div style={styles.bookInfo}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <p style={styles.bookAuthor}>by {book.author}</p>
              <div style={styles.bookPrice}>${book.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <button 
        style={styles.button}
        onClick={() => navigate('/books')}
      >
        Browse All Books
      </button>
    </section>
  );
};

export default NewReleases;