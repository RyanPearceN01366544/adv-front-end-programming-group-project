import React from 'react';
import MovieCard from './moviecard';
import './moviegrid.css';

const MovieGrid = ({ movies, loading }) => {
    if (loading) return <p className="loading-message">Loading...</p>;
    if (movies.length === 0) return <p className="no-movies-message">No movies found</p>;

    return(
        <main className="movie-grid">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
        </main>
    );
};
export default MovieGrid;