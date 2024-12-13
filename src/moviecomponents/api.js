const API_KEY = '34f639c5';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMoviesByTitle = async (title) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${title}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error("Error fetching movies by title:", error);
        return[];
    }
};

export const fetchMoviesByGenre = async (genre) => {
    try{
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie`);
        const data = await response.json();
        if (data.Response === 'True') {
            const moviePromises = data.Search.map(async (movie) => {
                const detailsResponse = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
                const details = await detailsResponse.json();
                return details;
            });

            const detailedMovies = await Promise.all(moviePromises);

if (genre === 'All Movies') return detailedMovies;
            return detailedMovies.filter((movie) =>
        movie.Genre?.toLowerCase().includes(genre.toLowerCase())
            );
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching movies by genre:' , error);
        return [];
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};