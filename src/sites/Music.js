// Music.js
import React, { useState } from "react";
import axios from "axios";
import "./Music.css";

const Music = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [category, setCategory] = useState(""); // To manage navigation filters

  // Fetch songs from the iTunes API
  const fetchMusic = async (filter = "song") => {
    setLoading(true);
    try {
      const response = await axios.get(`https://itunes.apple.com/search`, {
        params: {
          term: searchTerm || "best", // Default search term if empty
          entity: filter,
          limit: 15,
        },
      });
      setSongs(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Add a song to the playlist
  const addToPlaylist = (song) => {
    setPlaylist((prev) => [...prev, song]);
  };

  // Remove a song from the playlist
  const removeFromPlaylist = (songId) => {
    setPlaylist((prev) => prev.filter((song) => song.trackId !== songId));
  };

  // Handle navigation
  const handleNavigation = (type) => {
    setCategory(type);
    fetchMusic(type); // Fetch music based on the selected category
  };

  return (
    <div className="music-page">
      <div className="overlay"></div>
      <div className="content">
        <h1>Listening Previewer</h1>

        {/* Navigation */}
        <nav className="navigation">
          <button className="nav-btn" onClick={() => handleNavigation("song")}>
            Home
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("album")}
          >
            Albums
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("musicVideo")}
          >
            Music Videos
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("podcast")}
          >
            Podcasts
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("audiobook")}
          >
            Audiobooks
          </button>
        </nav>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for songs, artists, or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => fetchMusic(category)}>Search</button>
        </div>

        {/* Loading state */}
        {loading && <p className="loading-text">Loading...</p>}

        {/* Songs List */}
        <div className="music-list">
          {songs.map((song) => (
            <div key={song.trackId} className="music-item">
              <img
                src={song.artworkUrl100}
                alt={song.trackName}
                className="music-image"
              />
              <h3>{song.trackName}</h3>
              <p>Artist: {song.artistName}</p>
              <p>Album: {song.collectionName}</p>
              <audio controls>
                <source src={song.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button
                className="playlist-btn"
                onClick={() => addToPlaylist(song)}
              >
                Add to Playlist
              </button>
            </div>
          ))}
        </div>

       {/* Playlist */}
<div className="playlist">
  <h2>Your Playlist</h2>
  {playlist.length > 0 ? (
    playlist.map((song) => (
      <div key={song.trackId} className="playlist-item">
        <div className="song-details">
          <img
            src={song.artworkUrl100}
            alt={song.trackName}
            className="playlist-image"
          />
          <div>
            <p>{song.trackName}</p>
            <small>{song.artistName}</small>
          </div>
        </div>
        <button
          className="remove-btn"
          onClick={() => removeFromPlaylist(song.trackId)}
        >
          Remove
        </button>
      </div>
    ))
  ) : (
    <p>Your playlist is empty. Add songs to start building it!</p>
  )}
</div>

      </div>
    </div>
  );
};

export default Music;
