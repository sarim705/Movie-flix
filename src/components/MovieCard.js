import React from 'react';
import { Card, CardMedia, CardContent, Button, Typography } from '@mui/material';
import { Grid2 } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, genres, onToggleFavorite, isFavorite }) {
  const navigate = useNavigate();

  const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    ;

  const genreNames = movie.genre_ids.map(id => genres[id]).join(', ');

  return (
    <Grid2 item xs={12} sm={6} md={4} lg={3}>
      <Card
        onClick={() => navigate(`/movie/${movie.id}-${movie.title.replace(/\s+/g, '-').toLowerCase()}`)}
        style={{ cursor: 'pointer' }} 
      >
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2">Release Date: {movie.release_date}</Typography>
          <Typography variant="body2">Genres: {genreNames}</Typography>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation(); 
              onToggleFavorite(movie);
            }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </CardContent>
      </Card>
    </Grid2>
  );
}

export default MovieCard;
