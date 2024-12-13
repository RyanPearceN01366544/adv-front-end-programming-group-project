import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Home from './sites/Home'
import Movies from './sites/Movies'
import Music from './sites/Music'
import Games from './sites/Games'
import NotFound from './sites/NotFound'
import './Navigation.css';
import Books from './sites/Books';
import { useState, useEffect } from 'react';

const HomeC = () => <Home/>
const MoviesC = () => <Movies/>
const MusicC = () => <Music/>
const GamesC = () => <Games/>
const BooksC = () => <Books/>
const NotFoundC = () => <NotFound/>

export const normalNavButton = 'NavigationButton bg-gray-500 w-20 h-6 rounded';
export const activeNavButton = 'NavigationButton bg-blue-500 w-20 h-6 rounded';

export default function Navigation() {
    document.title = "R.A.D.S";
    const [currentActiveButton, setCurrentActiveButton] = useState();

    useEffect(() => {
        let button_ = undefined;
        switch (window.location.pathname){
            case ('/' || '/Home'): {
                button_ = document.getElementById('NavHomeButton');
                button_.className = activeNavButton;
                setCurrentActiveButton(button_);
                break;
            }
            case '/Movies': {
                button_ = document.getElementById('NavMoviesButton');
                button_.className = activeNavButton;
                setCurrentActiveButton(button_);
                break;
            }
            case '/Music': {
                button_ = document.getElementById('NavMusicButton');
                button_.className = activeNavButton;
                setCurrentActiveButton(button_);
                break;
            }
            case '/Games': {
                button_ = document.getElementById('NavGamesButton');
                button_.className = activeNavButton;
                setCurrentActiveButton(button_);
                break;
            }
            case '/Books': {
                button_ = document.getElementById('NavBooksButton');
                button_.className = activeNavButton;
                setCurrentActiveButton(button_);
                break;
            }
        }
    }, [])
    
    const handleButtons = (event) => {
        if (currentActiveButton !== undefined){
            currentActiveButton.className = normalNavButton;
        }
        setCurrentActiveButton(event.target);
        event.target.className = activeNavButton;
    }

    return(
        <BrowserRouter>
            <nav className="Navigation bg-slate-800 ">
                <div className='NavigationTitle'>
                    <h1 className='NavigationTitle'>R.A.D.S</h1>
                </div>
                <div className='NavigationButtonsDiv bg-slate-700'>
                    <Link to='/'><button id='NavHomeButton' onClick={handleButtons} className={normalNavButton}>Home</button></Link>
                    <Link to='/Movies'><button id='NavMoviesButton' onClick={handleButtons} className={normalNavButton}>Movies</button></Link>
                    <Link to='/Music'><button id='NavMusicButton' onClick={handleButtons} className={normalNavButton}>Music</button></Link>
                    <Link to='/Games'><button id='NavGamesButton' onClick={handleButtons} className={normalNavButton}>Games</button></Link>
                    <Link to='/Books'><button id='NavBooksButton' onClick={handleButtons} className={normalNavButton}>Books</button></Link>
                </div>
            </nav>
            <Routes className='DefaultWebsiteStyle'>
                <Route path='/' element={<HomeC/>}/>
                <Route path='/Movies' element={<MoviesC/>}/>
                <Route path='/Music' element={<MusicC/>}/>
                <Route path='/Games' element={<GamesC/>}/>
                <Route path='/Books' element={<BooksC/>}/>
                <Route path='*' element={<NotFoundC/>}/>
            </Routes>
        </BrowserRouter>
    )
}