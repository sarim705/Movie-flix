import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import NavBar from './components/NavBar';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setLoading(false);
    };

    loadApp();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/movies" element={<div>Movies Page (Placeholder)</div>} />
        <Route path="/tv-shows" element={<div>TV Shows Page (Placeholder)</div>} />
        <Route path="/favorites" element={<div>Favorites Page (Placeholder)</div>} />
      </Routes>
    </div>
  );
}

export default App;
