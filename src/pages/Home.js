import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchGenres, searchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';
import Banner from '../components/Banner';
import { Grid2, InputBase, Paper, IconButton, Snackbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [bannerMovie, setBannerMovie] = useState(null);
  const [genres, setGenres] = useState({});
  const [notification, setNotification] = useState(''); 

  const handleToggleFavorite = (movie) => {
    const updatedFavorites = favorites.some(fav => fav.id === movie.id)
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000); 
  };

  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres();
      setGenres(genres);
    };
    loadGenres();
  }, []);

  const loadMovies = async (page, query) => {
    const data = query ? await searchMovies(query, page) : await fetchMovies(page);
    setMovies(data.results);
    if (!query && page === 1) setBannerMovie(data.results[0]);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    loadMovies(page, debouncedQuery);
  }, [page, debouncedQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {bannerMovie && <Banner movie={bannerMovie} />}

      <Snackbar
        open={!!notification}
        message={notification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />

      <Grid2 container justifyContent="center" sx={{ padding: '20px 10px' }}>
        <Grid2 item xs={10} sm={10} md={8}>
          <Paper
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '150%',
              padding: '0.7px 5px',
              borderRadius: '25px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f5f5f5',
            }}
          >
            <IconButton aria-label="search">
              <SearchIcon sx={{ color: '#007bb2' }} />
            </IconButton>
            <InputBase
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                marginLeft: 2,
                flex: 1,
                fontSize: '1em',
                width: '100%',
              }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={3}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.some(fav => fav.id === movie.id)}
            showNotification={showNotification}
          />
        ))}
      </Grid2>

      <PaginationControls
        currentPage={page}
        onNext={() => setPage(page + 1)}
        onPrev={() => setPage(page - 1)}
      />
    </div>
  );
}

export default Home;
