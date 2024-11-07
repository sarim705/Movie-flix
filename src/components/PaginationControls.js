import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchGenres, searchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import PaginationControls from '../components/PaginationControls';
import Banner from '../components/Banner';
import { Grid2, InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(''); // Debounced query state
  const [bannerMovie, setBannerMovie] = useState(null);
  const [genres, setGenres] = useState({});

  const handleToggleFavorite = (movie) => {
    const updatedFavorites = favorites.some(fav => fav.id === movie.id)
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres();
      setGenres(genres);
    };
    loadGenres();
  }, []);

  // Update movies based on debounced search query
  useEffect(() => {
    const loadMovies = async () => {
      const data = debouncedSearchQuery ? await searchMovies(debouncedSearchQuery, page) : await fetchMovies(page);
      setMovies(data.results);
      if (!debouncedSearchQuery && page === 1) setBannerMovie(data.results[0]);
    };
    loadMovies();
  }, [page, debouncedSearchQuery]);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); 

    
    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <div>
      {bannerMovie && <Banner movie={bannerMovie} />}

      
      <Grid2 container justifyContent="center" sx={{ padding: '20px 10px' }}>
        <Grid2 item xs={12} sm={10} md={8}>
          <Paper
            component="form"
            onSubmit={(e) => e.preventDefault()} // Prevent form submission on Enter
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '4px 8px',
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
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Movies Grid */}
      <Grid2 container spacing={3}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.some(fav => fav.id === movie.id)}
          />
        ))}
      </Grid2>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={page}
        onNext={() => setPage(page + 1)}
        onPrev={() => setPage(page - 1)}
      />
    </div>
  );
}

export default Home;
