import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, genres, onToggleFavorite, isFavorite, showNotification }) {
  const navigate = useNavigate();

  const genreNames = movie.genre_ids.map(id => genres[id]).filter(Boolean).join(', ');

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    onToggleFavorite(movie);
    showNotification(isFavorite ? "Movie removed from favorites!" : "Movie added to favorites!");
  };

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        maxWidth: 200,
        cursor: 'pointer',
        margin: '10px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        sx={{ height: 300 }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {genreNames || "N/A"}
        </Typography>
        <IconButton
          onClick={handleFavoriteClick}
          color="primary"
          aria-label="toggle favorite"
          sx={{ marginTop: '8px' }}
        >
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="caption" color="textSecondary">
          {isFavorite ? 'Remove' : 'Add to Favorites'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
