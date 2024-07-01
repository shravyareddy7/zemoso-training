import React from 'react';
import { AppBar, Toolbar, Container, Typography, Button, Box } from '@mui/material'; // Import necessary MUI components
import TextComponent from '../../atoms/Text'; // Adjusted import path assuming TextComponent is properly exported
import ButtonComponent from '../../atoms/Button'; // Adjusted import path assuming ButtonComponent is properly exported

interface NavbarProps {
  onGalleryClick: () => void;
  onDashboardClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGalleryClick, onDashboardClick }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>

        <Box >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
          <TextComponent variant="h4">Online Gallery</TextComponent>
            </Container>
            <Container>
            
            <ButtonComponent
                variant="outlined"
                onClick={onDashboardClick}
                sx={{ mx: 1 }}
            >
                Dashboard
            </ButtonComponent>
            <ButtonComponent
                variant="outlined"
                onClick={onGalleryClick}
                sx={{ mx: 1 }}
                
            >
                Gallery
            </ButtonComponent>
           
            </Container>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
