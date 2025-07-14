import React, { useState } from 'react';
import { Container, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import URLForm from '../components/URLForm';

export default function ShortenPage() {
  const [shortenedLinks, setShortenedLinks] = useState([]);

  const handleShortened = (results) => {
    setShortenedLinks(results);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Shorten up to 5 URLs
        </Typography>
        <Box mt={3}>
          <URLForm onShortened={handleShortened} />
        </Box>
        {shortenedLinks.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Shortened URLs</Typography>
            <List>
              {shortenedLinks.map((link, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`http://localhost:3000/${link.shortcode}`}
                    secondary={`Expires at: ${new Date(link.expiresAt).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
