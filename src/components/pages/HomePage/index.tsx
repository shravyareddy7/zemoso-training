import React, { useState } from 'react';
import { Box, Container, Grid, ThemeProvider } from '@mui/material';
import Navbar from '../../organism/NavBar'; // Adjust the import path based on your project structure
import Gallery from '../../organism/Gallery';
import FormComponent from '../../organism/Form';
import theme from '../../../theme'; // Adjust the import path based on your project structure

const Homepage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'gallery' | 'dashboard'>('dashboard');

  const handleTabChange = (tab: 'gallery' | 'dashboard') => {
    setCurrentTab(tab);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar
          onGalleryClick={() => handleTabChange('gallery')}
          onDashboardClick={() => handleTabChange('dashboard')}
        />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {currentTab === 'gallery' && (
              <Grid item xs={12}>
                <Gallery />
              </Grid>
            )}
            {currentTab === 'dashboard' && (
              <Grid item xs={12}>
                <FormComponent />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
