import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getShortUrl, addClickToUrl } from '../storage/shortenedUrlStorage';
import { logEvent } from '../logger/Logger';

export default function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const url = getShortUrl(shortcode);
    if (!url) {
      alert("Invalid Shortcode");
      return;
    }

    const now = new Date();
    if (new Date(url.expiresAt) < now) {
      alert("This link has expired.");
      return;
    }

    addClickToUrl(shortcode, {
      timestamp: now.toISOString(),
      source: "localhost",
    });

    logEvent({
      level: 'info',
      pkg: 'page',
      message: `Redirecting to ${url.original}via shortcode ${shortcode}`,
    });
    logEvent({
      level: 'warn',
      pkg: 'page',
      message: `Expired or invalid shortcode: ${shortcode}`,
    });


    window.location.href = url.original;
  }, [shortcode]);

  return <div>Redirecting...</div>;
}
