import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { generateShortcode, isValidUrl } from '../utils/shortcodeUtils';
import { saveShortUrl, getShortUrl } from '../storage/shortenedUrlStorage';
import { logEvent } from '../logger/Logger';

export default function URLForm({ onShortened }) {
  const [inputs, setInputs] = useState(
    Array(5).fill({ original: '', validity: '', shortcode: '' })
  );

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleShorten = () => {
    const results = [];

    for (let i = 0; i < inputs.length; i++) {
      const { original, validity, shortcode } = inputs[i];
      if (!original) continue;

      if (!isValidUrl(original)) {
        alert(`Row ${i + 1}: Invalid URL`);
        logEvent({
          level: 'warn',
          pkg: 'component',
          message: `Invalid URL at index ${i}`
        });
        return;
      }

      const code = shortcode || generateShortcode();
      if (getShortUrl(code)) {
        alert(`Row ${i + 1}: Shortcode already exists`);
        logEvent({
          level: 'warn',
          pkg: 'component',
          message: `Shortcode collision at index ${i}`
        });
        return;
      }

      const createdAt = new Date();
      const minutes = parseInt(validity || 30, 10);
      const expiresAt = new Date(createdAt.getTime() + minutes * 60000);

      const data = {
        original,
        shortcode: code,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clicks: [],
      };

      saveShortUrl(code, data);
      results.push(data);

      logEvent({
        level: 'info',
        pkg: 'component',
        message: `Shortened for ${original}`.slice(0, 48),
      });
    }

    if (typeof onShortened === 'function') {
      onShortened(results);
    }

    // Optionally clear inputs
    setInputs(Array(5).fill({ original: '', validity: '', shortcode: '' }));
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>Shorten up to 5 URLs</Typography>
      <Grid container spacing={2}>
        {inputs.map((row, i) => (
          <Grid container item spacing={1} key={i}>
            <Grid item xs={5}>
              <TextField
                label="Original URL"
                fullWidth
                value={row.original}
                onChange={(e) => handleChange(i, 'original', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Validity (minutes)"
                type="number"
                fullWidth
                value={row.validity}
                onChange={(e) => handleChange(i, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={row.shortcode}
                onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleShorten}>
            Shorten URLs
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
