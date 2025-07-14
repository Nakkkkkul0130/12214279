import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShortenPage from './routes/ShortenPage';
import StatisticsPage from './routes/StatisticsPage';
import RedirectHandler from './routes/RedirectHandler';
import { useEffect } from 'react';
import { fetchAccessToken } from './auth/tokenService';

export default function App() {
  useEffect(() => {
    fetchAccessToken(); 
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}
