import { type Book } from './BooksPage';

interface BookCardProps {
  book: Book;
  onBookClick: (id: string) => void;
  onAddToCart: (id: string) => void;
  onAddToFavorite: (id: string) => void;
}

export default function BookCard({ book, onBookClick, onAddToCart, onAddToFavorite }: BookCardProps) {
  return (
    <div 
      style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={() => onBookClick(book.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img 
        src={book.coverImage} 
        alt={book.title} 
        style={{ 
          width: '100%', 
          height: '250px', 
          objectFit: 'cover', 
          marginBottom: '10px',
          borderRadius: '4px'
        }} 
      />
      <h3 style={{ margin: '5px 0', fontSize: '1.1rem' }}>{book.title}</h3>
      <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '10px' }}>{book.author}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        <button 
          style={{ 
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            background: '#3182ce',
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(book.id);
          }}
        >
          Add to Cart
        </button>
        <button 
          style={{ 
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            background: '#e53e3e',
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToFavorite(book.id);
          }}
        >
          ♥
        </button>
      </div>
    </div>
  );
}