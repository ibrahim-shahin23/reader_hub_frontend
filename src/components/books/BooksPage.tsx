import { useState } from 'react';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';

export type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  price: number;
  rating?: number;
};

//mock books data
const mockBooks: Book[] = [
  {
    id: '1', title: 'The Hobbit', author: 'J.R.R. Tolkien',
    coverImage: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg',
    category: 'Fantasy', price: 12.99, rating: 4.8
  },
  {
    id: '2', title: 'Dune', author: 'Frank Herbert',
    coverImage: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg',
    category: 'Science Fiction', price: 15.99, rating: 4.7
  },
  {
    id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee',
    coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fiction', price: 10.99, rating: 4.9
  },
  {
    id: '4', title: '1984', author: 'George Orwell',
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
    category: 'Dystopian', price: 9.99, rating: 4.6
  },
  {
    id: '5', title: 'Pride and Prejudice', author: 'Jane Austen',
    coverImage: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
    category: 'Romance', price: 8.50, rating: 4.5
  },
  {
    id: '6', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',
    coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    category: 'Classic', price: 10.25, rating: 4.3
  },
  {
    id: '7', title: 'Moby Dick', author: 'Herman Melville',
    coverImage: 'https://m.media-amazon.com/images/I/91C4S8nD1VL._AC_UF1000,1000_QL80_.jpg',
    category: 'Adventure', price: 11.75, rating: 4.0
  },
  {
    id: '8', title: 'War and Peace', author: 'Leo Tolstoy',
    coverImage: 'https://m.media-amazon.com/images/I/91DfSd1aGAL._AC_UF1000,1000_QL80_.jpg',
    category: 'Historical', price: 14.99, rating: 4.4
  },
  {
    id: '9', title: 'The Odyssey', author: 'Homer',
    coverImage: 'https://m.media-amazon.com/images/I/91S5S+OogYL._AC_UF1000,1000_QL80_.jpg',
    category: 'Epic', price: 9.25, rating: 4.2
  },
  {
    id: '10', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky',
    coverImage: 'https://m.media-amazon.com/images/I/81XQb1+SDJL._AC_UF1000,1000_QL80_.jpg',
    category: 'Psychological', price: 10.50, rating: 4.5
  },
  {
    id: '11', title: 'The Catcher in the Rye', author: 'J.D. Salinger',
    coverImage: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg',
    category: 'Young Adult', price: 9.99, rating: 4.0
  },
  {
    id: '12', title: 'The Alchemist', author: 'Paulo Coelho',
    coverImage: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg',
    category: 'Self-Help', price: 8.99, rating: 4.7
  },

  {
    id: '13', title: 'Brave New World', author: 'Aldous Huxley',
    coverImage: 'https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg',
    category: 'Dystopian', price: 10.99, rating: 4.3
  },
  {
    id: '14', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien',
    coverImage: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fantasy', price: 18.99, rating: 4.9
  },
  {
    id: '15', title: 'The Silent Patient', author: 'Alex Michaelides',
    coverImage: 'https://m.media-amazon.com/images/I/81L5Lor1fRL._AC_UF1000,1000_QL80_.jpg',
    category: 'Thriller', price: 12.50, rating: 4.5
  }
];

const categories = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
  'Biography', 'History', 'Self-Help', 'Romance', 
  'Mystery', 'Thriller', 'Horror', 'Young Adult', 
  'Children', 'Poetry', 'Drama'
] as const;

const BOOKS_PER_PAGE = 10;

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handleBookClick = (id: string) => {
    console.log(`Navigating to book ${id}`);
  };

  const handleAddToCart = (id: string) => {
    console.log(`Added book ${id} to cart`);
  };

  const handleAddToFavorite = (id: string) => {
    console.log(`Added book ${id} to favorites`);
  };

  return (
    <div style={{ 
      padding: '15px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      minHeight: 'calc(100vh - 100px)'
    }}>
      <h1 style={{ 
        fontSize: '1.8rem', 
        marginBottom: '15px', 
        textAlign: 'center',
        color: '#2c3e50'
      }}>
        Our Book Collection ({filteredBooks.length} books)
      </h1>
      
      <div style={{ 
        margin: '15px 0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px'
      }}>
        <SearchBar onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }} />
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '15px',
        margin: '20px 0'
      }}>
        {paginatedBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onBookClick={handleBookClick}
            onAddToCart={handleAddToCart}
            onAddToFavorite={handleAddToFavorite}
          />
        ))}
      </div>
      
      {filteredBooks.length > 0 ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '30px',
          padding: '20px 0',
          borderTop: '1px solid #eee'
        }}>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No books found matching your criteria
        </div>
      )}
    </div>
  );
}