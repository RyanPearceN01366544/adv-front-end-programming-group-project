import React from 'react';
import './sidebar.css';

const Sidebar = ({ onGenreClick, selectedGenre }) => {
const genres =  ['All Movies','Action','Animation', 'Comedy', 'Drama', 'Horror', 'Romance','Sci-Fi', 'Thriller'];

    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Genres</h2>
            <ul className="category-list">
                {genres.map((genre) => (
                 <li
                 key={genre}
                 className={`category-item ${selectedGenre === genre ? 'active' : ''}`}
                 onClick={() => onGenreClick(genre)}>
                    {genre}
</li>   
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;