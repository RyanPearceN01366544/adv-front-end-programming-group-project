import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Home from './sites/Home'
import Movies from './sites/Movies'
import Music from './sites/Music'
import Games from './sites/Games'
import NotFound from './sites/NotFound'
import './Navigation.css';

const HomeC = () => <Home/>
const MoviesC = () => <Movies/>
const MusicC = () => <Music/>
const GamesC = () => <Games/>
const NotFoundC = () => <NotFound/>

export default function Navigation() {
    return(
        <BrowserRouter>
            <nav className="Navigation">
                <div className='NavigationTitle'>
                    <h1>Temporary Title Name!</h1>
                </div>
                <div className='NavigationButtonsDiv'>
                    <Link to='/'><button className="NavigationButton">Home</button></Link>
                    <Link to='/Movies'><button className="NavigationButton">Movies</button></Link>
                    <Link to='/Music'><button className="NavigationButton">Music</button></Link>
                    <Link to='/Games'><button className="NavigationButton">Games</button></Link>
                </div>
            </nav>
            <Routes className='DefaultWebsiteStyle'>
                <Route path='/' element={<HomeC/>}/>
                <Route path='/Movies' element={<MoviesC/>}/>
                <Route path='/Music' element={<MusicC/>}/>
                <Route path='/Games' element={<GamesC/>}/>
                <Route path='*' element={<NotFoundC/>}/>
            </Routes>
        </BrowserRouter>
    )
}