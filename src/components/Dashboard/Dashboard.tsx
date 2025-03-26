import React, { useState } from 'react';
import { Box, Typography, useTheme, ThemeProvider, createTheme } from '@mui/material';
import UserTab from './UserTab';
import PublishersTab from './PublishersTab';
import BooksTab from './BooksTab';
import CategoriesTab from './CategoriesTab';
import {
  People as UsersIcon,
  Store as PublishersIcon,
  MenuBook as BooksIcon,
  Category as CategoriesIcon,
  Storefront
} from '@mui/icons-material';

// Create a custom theme with modern colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Modern blue
      light: '#42a5f5',
      dark: '#1565c0',
    },
    background: {
      default: '#e7f9fa', // Lighter teal for main background
      paper: '#eef1ff', // Your specified color for content boxes
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners
  },
});

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const theme = useTheme();

  const renderTabContent = () => {
    switch(activeTab) {
      case 'users':
        return <UserTab />;
      case 'publishers':
        return <PublishersTab />;
      case 'books':
        return <BooksTab />;
      case 'categories':
        return <CategoriesTab />;
      default:
        return <UserTab />;
    }
  };

  // Tab configuration with icons
  const tabs = [
    { id: 'users', label: 'Users', icon: <UsersIcon /> },
    { id: 'publishers', label: 'Publishers', icon: <PublishersIcon /> },
    { id: 'books', label: 'Books', icon: <BooksIcon /> },
    { id: 'categories', label: 'Categories', icon: <CategoriesIcon /> }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        height: '100vh',
        backgroundColor: theme.palette.background.default
      }}>
        {/* Modern Blue Sidebar */}
        <Box 
          sx={{ 
            width: 280, 
            bgcolor: 'primary.main', 
            color: 'common.white',
            p: 3,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              fontSize: '1.75rem',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Storefront sx={{ fontSize: '1.5 rem' }} />
            Dasboard
          </Typography>
          
          {tabs.map((tab) => (
            <Box 
              key={tab.id}
              sx={{ 
                p: 2, 
                mb: 1,
                cursor: 'pointer', 
                borderRadius: theme.shape.borderRadius,
                bgcolor: activeTab === tab.id ? 'primary.dark' : 'transparent',
                '&:hover': { 
                  bgcolor: activeTab === tab.id ? 'primary.dark' : 'primary.light',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease-in-out'
                },
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeTab === tab.id ? 'common.white' : 'rgba(255,255,255,0.8)'
              }}>
                {React.cloneElement(tab.icon, { fontSize: 'small' })}
              </Box>
              <Typography 
                sx={{
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  fontSize: '0.95rem'
                }}
              >
                {tab.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Main Content Area with modern styling */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: 4, 
            overflow: 'auto',
            backgroundColor: '#1565c0'
          }}
        >
          <Box
            sx={{
              backgroundColor:'#1565c0',
              borderRadius: theme.shape.borderRadius,
              p: 1,
              mb: 1,
              boxShadow: 0
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2,
                fontWeight: '600',
                color: 'common.white',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {tabs.find(t => t.id === activeTab)?.icon}
              {tabs.find(t => t.id === activeTab)?.label}
            </Typography>
          </Box>
          
          {/* Tab Content */}
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper, // #cff6f9
              borderRadius: theme.shape.borderRadius,
              p: 3,
              boxShadow: 3
            }}
          >
            {renderTabContent()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;