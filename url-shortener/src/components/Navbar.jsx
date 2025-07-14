import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          URL Shortener
        </Typography>

        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Shorten URL
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/statistics"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
