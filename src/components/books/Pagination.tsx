interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {currentPage > 1 && (
          <button 
            style={{ 
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: 'pointer'
            }}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            style={{ 
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: currentPage === page ? '#3182ce' : 'white',
              color: currentPage === page ? 'white' : 'black',
              cursor: 'pointer'
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        
        {currentPage < totalPages && (
          <button 
            style={{ 
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              cursor: 'pointer'
            }}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  }