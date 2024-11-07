import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../api';
import { Box, Button, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          color: '#007bb2',
          borderColor: '#007bb2',
          '&:hover': {
            backgroundColor: '#e0f7fa',
            borderColor: '#007bb2',
          }
        }}
      >
        Back
      </Button>

      
      <Card sx={{ display: 'flex', boxShadow: 3, padding: 2, borderRadius: 2 }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{
            width: 400,
            height: 'auto',
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        />
        <CardContent sx={{ ml: 3, flex: '1 1 auto' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {movie.overview}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>Release Date:</strong> {movie.release_date}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>Runtime:</strong> {movie.runtime} minutes
            </Typography>
            
          
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>Genres:</strong> {movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>Cast:</strong> {movie.cast?.map(actor => actor.name).join(', ') || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <strong>Rating:</strong> {movie.vote_average || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetailPage;
