import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function Banner ( {movie} )  {
  const navigate = useNavigate();
  const bannerUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${bannerUrl})`,
        backgroundSize: 'cover',
        color: 'white',
        padding: '5% 30%',
        textAlign: 'center',
        cursor: 'pointer'
      }}
 
      onClick={() => navigate(`/movie/${movie.id}-${movie.title.replace(/\s+/g, '-').toLowerCase()}`)}

    >
      <Typography variant="h3">{movie.title}</Typography>
      <Typography variant="h6">{movie.tagline || 'Explore Popular Movies'}</Typography>
    </Box>
  );
};

export default Banner;
