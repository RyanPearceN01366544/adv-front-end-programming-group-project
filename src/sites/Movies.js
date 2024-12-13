import { useState, useEffect } from 'react';
import Sidebar from '../moviecomponents/sidebar';
import SearchBar from '../moviecomponents/searchbar';
import MovieGrid from '../moviecomponents/moviegrid';
import { fetchMoviesByGenre, fetchMoviesByTitle } from '../moviecomponents/api';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
  
    useEffect(() => {
      const fetchMovies = async () => {
       if (selectedGenre) {
        setLoading(true);
        const data = await fetchMoviesByGenre(selectedGenre);
        setMovies(data);
        setLoading(false);
       }
      };
  
      fetchMovies();
    }, [selectedGenre]);
  
    const handleSearch = async (title) => {
      setLoading(true);
      const data = await fetchMoviesByTitle(title);
      setMovies(data);
      setLoading(false);
    };
  
    const handleGenreClick = async (genre) => {
      setSelectedGenre(genre);
    };

    return(
        <div>
            <div className="app-main">
        <Sidebar onGenreClick={handleGenreClick}
        selectedGenre={selectedGenre}/>
        <div className="content-area">
          <SearchBar onSearch={handleSearch} />
          <MovieGrid movies={movies} loading={loading}/>
        </div>
      </div>
            <h1>Movies</h1>
        </div>
    );
    }

    export default Movies;