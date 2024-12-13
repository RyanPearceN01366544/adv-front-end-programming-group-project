import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'
import { normalNavButton, activeNavButton } from '../Navigation';

export default function Home(){
    useEffect(() => {
        let button_ = undefined;
        button_ = document.getElementById('NavHomeButton')
        button_.className = normalNavButton;
        button_ = document.getElementById('NavMoviesButton')
        button_.className = normalNavButton;
        button_ = document.getElementById('NavMusicButton')
        button_.className = normalNavButton;
        button_ = document.getElementById('NavGamesButton')
        button_.className = normalNavButton;
        button_ = document.getElementById('NavBooksButton')
        button_.className = normalNavButton;

        switch (window.location.pathname){
            case ('/' || '/Home'): {
                button_ = document.getElementById('NavHomeButton');
                button_.className = activeNavButton;
                break;
            }
            case '/Movies': {
                button_ = document.getElementById('NavMoviesButton');
                button_.className = activeNavButton;
                break;
            }
            case '/Music': {
                button_ = document.getElementById('NavMusicButton');
                button_.className = activeNavButton;
                break;
            }
            case '/Games': {
                button_ = document.getElementById('NavGamesButton');
                button_.className = activeNavButton;
                break;
            }
            case '/Books': {
                button_ = document.getElementById('NavBooksButton');
                button_.className = activeNavButton;
                break;
            }
        }
    }, [])

    return(
        <div className="HomeBackground bg-slate-600">
            <div className="HomeSections">
                <div className="HomeSection flex flex-col my-10 border-2 border-slate-400 border-solid p-2">
                    <u className='HomeTitleText'>About This Website!</u>
                    <p className='text-wrap my-5'>
                        Hello and welcome to R.A.D.S, a website made with the purpose of delivering information about Games, Movies, Music and Books.
                        This website will help you find things from those genre of media which may or may not include even fan pieces.
                        Thank you for visiting our website and I hope you enjoy.
                    </p>
                </div>
                <div className='HomeSection flex flex-col my-10 border-2 border-slate-400 border-solid p-2'>
                    <u className='HomeTitleText'>Credits</u>
                    <div>
                        <p>Ryan Pearce - Games, Home and Navbar</p>
                        <p>Adel Ali - Books</p>
                        <p>Dipin Bhandari - Music</p>
                        <p>Shajay Cockrane - Movies</p>
                    </div>
                </div>
            </div>
            <div className='HomeSection HomePortals flex flex-col my-10 border-2 border-slate-400 border-solid p-2'>
                <u className='HomeTitleText'>Portals</u>
                <p className='mb-10'>Just a set of buttons that will take you to the different pages on the site, however you can use the navigation bar at any time to visit them at any time!</p>
                <div className='flex flex-row divide-solid divide-x'>
                    <div className='px-2'>
                        <p>Look up movies both new and old with a very nice design! All and more in the movies page!</p>       
                        <Link to='/Movies' className='rounded bg-sky-700 px-1 my-5 h-7 w-20'>Movies</Link>
                    </div>
                    <div className='px-2'>
                        <p>Popular Songs, Latest Hits, All can be found in the Music page!</p>
                        <Link to='/Music' className='rounded bg-sky-700 px-1 my-5 h-7 w-20'>Music</Link>
                    </div>
                    <div className='px-2'>
                        <p>Games, Developers, Platforms? You want it, it's yours! In the Games Page!</p>
                        <Link to="/Games" className='rounded bg-sky-700 px-1 my-5 h-7 w-20'>Games</Link>
                    </div>
                    <div className='px-2'>
                        <p>Wanting to find a detective novel, or maybe just browsing for the next book to read before bed? The Books Page has you covered!</p>
                        <Link to="/Books" className='rounded bg-sky-700 px-1 my-5 h-7 w-20'>Books</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}