import React, { useState, useEffect } from "react";
import "./Music.css";
import backgroundImage from "../images/unsplash.jpg"; // Ensure the image is placed correctly in the 'images' folder

const Music = () => {
const [genres, setGenres] = useState([]);
const [tracks, setTracks] = useState([]);
const [nowPlaying, setNowPlaying] = useState(null);
const [searchQuery, setSearchQuery] = useState("");

const DEEZER_API_URL = "https://api.deezer.com";

  // Fetch genres on page load
useEffect(() => {
    const fetchGenres = async () => {
    try {
        const response = await fetch(`${DEEZER_API_URL}/genre`);
        const data = await response.json();
        setGenres(data.data.slice(1)); // Skip the "All" genre
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
    };
    fetchGenres();
}, []);

  // Fetch tracks for a specific genre
const fetchTracks = async (genreId) => {
    try {
    const response = await fetch(`${DEEZER_API_URL}/chart/${genreId}/tracks`);
    const data = await response.json();
    setTracks(data.data);
    } catch (error) {
    console.error("Error fetching tracks:", error);
    }
};

  // Fetch tracks by artist search
const fetchTracksByArtist = async () => {
    if (!searchQuery) return;
    try {
    const response = await fetch(`${DEEZER_API_URL}/search/artist?q=${searchQuery}`);
    const data = await response.json();
    setTracks(data.data);
    } catch (error) {
    console.error("Error fetching artist tracks:", error);
    }
};

return (
    <div
    className="music-container"
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Hero Section */}
    <div className="music-hero">
        <h1>Discover Music</h1>
        <p>Explore genres, search for artists, and enjoy top tracks!</p>

        {/* Search Bar */}
        <div className="search-bar">
        <input
            type="text"
            placeholder="Search by Artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={fetchTracksByArtist}>Search</button>
        </div>
    </div>

      {/* Genres Section */}
    <section className="music-genres">
        <h2>Genres</h2>
        <div className="genres-list">
        {genres.map((genre) => (
            <div
            key={genre.id}
            className="genre-card"
            onClick={() => fetchTracks(genre.id)}
            style={{ backgroundImage: `url(${genre.picture_medium})` }}
            >
            <p>{genre.name}</p>
            </div>
        ))}
        </div>
    </section>

      {/* Tracks Section */}
    {tracks.length > 0 && (
        <section className="music-tracks">
        <h2>Top Tracks</h2>
        <div className="tracks-list">
            {tracks.map((track) => (
            <div
                key={track.id}
                className="track-card"
                onClick={() => setNowPlaying(track)}
            >
                <img src={track.album.cover_medium} alt={track.title} />
                <p>{track.title}</p>
                <small>{track.artist.name}</small>
            </div>
            ))}
        </div>
        </section>
    )}

      {/* Now Playing Section */}
    {nowPlaying && (
        <section className="now-playing">
        <h2>Now Playing</h2>
        <div className="now-playing-card">
            <img
            src={nowPlaying.album.cover_medium}
            alt={nowPlaying.title}
            />
            <p>{nowPlaying.title}</p>
            <p>
            <strong>{nowPlaying.artist.name}</strong>
            </p>
            <audio controls src={nowPlaying.preview}></audio>
        </div>
        </section>
    )}
    </div>
);
};

export default Music;
