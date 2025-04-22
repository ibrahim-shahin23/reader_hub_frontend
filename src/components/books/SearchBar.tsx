interface SearchBarProps {
    onSearch: (query: string) => void;
  }
  
  export default function SearchBar({ onSearch }: SearchBarProps) {
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search for books..."
          style={{ 
            padding: '10px', 
            borderRadius: '4px', 
            border: '1px solid #ddd',
            flex: '1',
            maxWidth: '500px'
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  }