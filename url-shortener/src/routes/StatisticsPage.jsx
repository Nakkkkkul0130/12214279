import { getAllShortUrls } from '../storage/shortenedUrlStorage';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function StatisticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getAllShortUrls());
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Shortened URL Statistics
      </Typography>

      {data.map((url) => (
        <Card key={url.shortcode} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography>Shortcode: {url.shortcode}</Typography>
            <Typography>Original: {url.original}</Typography>
            <Typography>Created: {new Date(url.createdAt).toLocaleString()}</Typography>
            <Typography>Expires: {new Date(url.expiresAt).toLocaleString()}</Typography>
            <Typography>Total Clicks: {url.clicks?.length || 0}</Typography>

            {url.clicks?.map((click, index) => (
              <Typography key={index} sx={{ marginLeft: 2 }}>
                - {new Date(click.timestamp).toLocaleString()} from {click.source}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
