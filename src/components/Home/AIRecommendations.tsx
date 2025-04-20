import React from 'react';
import { useNavigate } from 'react-router-dom';

const AIRecommendations: React.FC = () => {
  const navigate = useNavigate();

  const recommendedBooks = [
    {
      id: '1',
      title: 'The AI Revolution',
      author: 'Dr. Samantha Chen',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 28.99
    },
    {
      id: '2',
      title: 'Machine Learning',
      author: 'Prof. Alan Turing',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 24.50
    },
    {
      id: '3',
      title: 'Neural Networks',
      author: 'Dr. Yann LeCun',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 26.75
    },
    {
      id: '4',
      title: 'AI Future',
      author: 'Elaine Musk',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 29.99
    },
    {
      id: '5',
      title: 'Deep Learning',
      author: 'Ian Goodfellow',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 32.50
    }
  ];

  // Compact card styles
  const styles = {
    section: {
      padding: '2rem 1rem',
      backgroundColor: '#f8fafcff',
      fontFamily: "'Inter', sans-serif",
      maxWidth: '1200px', // Increased max-width
      margin: '0 auto',
      textAlign: 'center' as const
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: '600' as const,
      marginBottom: '1.5rem',
      color: '#1e293b'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(180px, 1fr))', // Fixed 5 columns
      gap: '1.25rem',
      padding: '0 1rem',
      margin: '0 auto',
      maxWidth: '1100px' // Adjusted max-width
    },
    bookCard: {
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      textAlign: 'center' as const,
      '&:hover': {
        transform: 'translateY(-3px)'
      }
    },
    bookImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover' as const,
      borderBottom: '1px solid #f1f5f9'
    },
    bookInfo: {
      padding: '0.75rem 0.5rem'
    },
    bookTitle: {
      fontSize: '0.9375rem',
      fontWeight: '600' as const,
      margin: '0 0 0.25rem',
      color: '#1e293b',
      lineHeight: '1.3',
      display: '-webkit-box',
      WebkitLineClamp: 2 as const,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minHeight: '2.5rem'
    },
    bookAuthor: {
      fontSize: '0.8125rem',
      color: '#64748b',
      margin: '0 0 0.25rem'
    },
    bookPrice: {
      fontSize: '0.9375rem',
      fontWeight: '700' as const,
      color: '#3b82f6',
      margin: '0.5rem 0 0'
    },
    button: {
      display: 'inline-block',
      margin: '1.5rem auto 0',
      padding: '0.625rem 1.5rem',
      fontSize: '0.9375rem',
      fontWeight: '600' as const,
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#2563eb'
      }
    },
    // Responsive adjustments
    '@media (max-width: 1200px)': {
      grid: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        maxWidth: '800px'
      }
    },
    '@media (max-width: 768px)': {
      grid: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        maxWidth: '600px'
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
      <h2 style={styles.heading}>Recommended by AI</h2>
      <div style={styles.grid}>
        {recommendedBooks.map((book) => (
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
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x180/f3f4f6/64748b?text=Book+Cover';
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
        onClick={() => navigate('/recommendations')}
      >
        Browse Recommendations
      </button>
    </section>
  );
};

export default AIRecommendations;