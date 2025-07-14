import { Card, CardContent, Typography, Link } from '@mui/material';

export default function URLCard({ url }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">
          Original: <Link href={url.original} target="_blank">{url.original}</Link>
        </Typography>
        <Typography>
          Shortened: <Link href={`/${url.shortcode}`} target="_blank">
            http://localhost:3000/{url.shortcode}
          </Link>
        </Typography>
        <Typography>Expires At: {new Date(url.expiresAt).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
}
