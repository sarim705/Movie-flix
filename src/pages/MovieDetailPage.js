import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../api'; // Your API call function

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

  if (loading) return <div>Loading...</div>;

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: '200px' }}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Genres: {movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}</p>
      <p>Cast: {movie.cast?.map(actor => actor.name).join(', ') || 'N/A'}</p>
      <p>Rating: {movie.vote_average || 'N/A'}</p>
    </div>
  );
};

export default MovieDetailPage;
