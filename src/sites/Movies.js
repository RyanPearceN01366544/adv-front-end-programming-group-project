import '../App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../moviecomponents/searchbar';
import Sidebar from '../moviecomponents/sidebar';
import MovieGrid from '../moviecomponents/moviegrid';
import { fetchMoviesByTitle, fetchMoviesByGenre } from '../moviecomponents/api';


export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('All Movies');
  
    useEffect(() => {
      const fetchDefaultMovies = async () => {
        setLoading(true);
        const data = await fetchMoviesByGenre(selectedGenre);
        setMovies(data);
        setLoading(false);
      };
  
      fetchDefaultMovies();
    }, [selectedGenre]);
  
    const handleSearch = async (title) =>{
      setLoading(true);
      const data = await fetchMoviesByTitle(title);
      setMovies(data);
      setLoading(false);
    };
  
    const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setLoading(true);
    const data = await fetchMoviesByGenre(genre);
    setMovies(data);
    setLoading(false);
    };

    return(
        <div className="app-main">
            <Sidebar onGenreClick={handleGenreClick}
            selectedGenre={selectedGenre}/>
            <div className="content-area">
                <SearchBar onSearch={handleSearch} />
                <MovieGrid movies={movies} loading={loading}/>
            </div>
      </div>
    )
}