interface CategoryFilterProps {
    categories: readonly string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
  }
  
  export default function CategoryFilter({ 
    categories, 
    selectedCategory, 
    onSelectCategory 
  }: CategoryFilterProps) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <button
          style={{ 
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            background: !selectedCategory ? '#3182ce' : 'white',
            color: !selectedCategory ? 'white' : 'black',
            cursor: 'pointer'
          }}
          onClick={() => onSelectCategory(null)}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category}
            style={{ 
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: selectedCategory === category ? '#3182ce' : 'white',
              color: selectedCategory === category ? 'white' : 'black',
              cursor: 'pointer'
            }}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }