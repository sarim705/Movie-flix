
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          MovieFlix
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/movies" color="inherit">
            Movies
          </Button>
          <Button component={Link} to="/tv-shows" color="inherit">
            TV Shows
          </Button>
          <Button component={Link} to="/favorites" color="inherit">
            Favorites
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
