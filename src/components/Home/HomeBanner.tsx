import React from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../../assets/banner-image.png';

const HomeBanner: React.FC = () => {
  const navigate = useNavigate();

  const styles = {
    banner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1rem',
      backgroundColor: '#ffffff',
      margin: '1rem 0',
      flexWrap: 'wrap' as const,
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      border: 'none'
    },
    content: {
      flex: '1',
      padding: '0 2rem',
      minWidth: '300px',
      maxWidth: '600px',
      textAlign: 'center' as const
    },
    heading: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      color: '#2c3e50',
      marginBottom: '1rem',
      fontWeight: '700' as const,
      lineHeight: '1.3'
    },
    text: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      color: '#7f8c8d',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    button: {
      padding: '12px 28px',
      fontSize: '1rem',
      fontWeight: '600' as const,
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const,
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '0 auto'
    },
    imageContainer: {
      flex: '1',
      minWidth: '300px',
      maxWidth: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '350px',
      objectFit: 'contain' as const
    },
    '@media (max-width: 768px)': {
      banner: {
        padding: '1.5rem 1rem',
        flexDirection: 'column'
      },
      content: {
        padding: '0',
        marginBottom: '1.5rem'
      },
      imageContainer: {
        padding: '0'
      }
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#2980b9';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#3498db';
  };

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Virtual Book Fair</h1>
        <p style={styles.text}>
          Welcome to our virtual book fair<br />
          The future of reading is here
        </p>
        <button 
          onClick={() => navigate('/books')}
          style={styles.button}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          BROWSE BOOKS
        </button>
      </div>
      
      <div style={styles.imageContainer}>
        <img 
          src={bannerImage} 
          alt="Book fair illustration" 
          style={styles.image} 
        />
      </div>
    </div>
  );
};

export default HomeBanner;