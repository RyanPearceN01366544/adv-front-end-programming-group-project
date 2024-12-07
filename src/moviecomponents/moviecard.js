import React, { useState } from 'react';
import { fetchMovieDetails } from './api';
import './moviecard.css';

const MovieCard = ({ movie }) => {
    const [details, setDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const handleCardClick = async () => {
        if (!details && !loadingDetails) {
            setLoadingDetails(true);
            const data = await fetchMovieDetails(movie.imdbID);
            setDetails(data);
            setLoadingDetails(false);
        }
    };

    return (
        <div className="movie-card"
        onClick={handleCardClick}>
            <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}
            alt={`movie.Title} Poster`}
            className="movie-poster"/>
            <h2 className="movie-title">{movie.Title}</h2>
            <p classname="movie-year">{movie.Year}</p>
            {details && (
                <div className="movie-details">
                   <p><strong>Actors:</strong> {details.Actors || 'N/A'}</p>
                   <p><strong>Director:</strong> {details.Director || 'N/A'}</p>
                   <p><strong>Plot:</strong> {details.Plot || 'N/A'}</p>
                </div>
            )}
            {loadingDetails && <p className="loading-message">Fetching details...</p>}
        </div>
    );
};

export default MovieCard;