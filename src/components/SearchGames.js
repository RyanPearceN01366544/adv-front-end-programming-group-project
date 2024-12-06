import {useState, useEffect} from 'react';
import {API_KEY} from '../sites/Games';

function SearchGames({size = 4}){
    const [searchNextWebsite, setSearchNextWebsite] = useState('');
    const [searchPrevWebsite, setSearchPrevWebsite] = useState('');
    const [searchGamesWebsite, setSearchGamesWebsite] = useState(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${size}`);
    const [searchGamesData, setSearchGamesData] = useState([]);
    // -- Search Variables --
    const [searchGamesTitle, setSearchGamesTitle] = useState('');
    const [platforms, setPlatforms] = useState([]);
    function HandleSearchGamesTitleChange(event){
        setSearchGamesTitle(event.target.value);
    }
    const [searchGamesPlatform, setSearchGamesPlatform] = useState(-1);
    function HandleSearchGamesPlatformChange(event){
        setSearchGamesPlatform(event.target.value);
    }

    // Initial Effect
    useEffect(() => { // Placing here as this is what the site will do first when refreshed/loaded!
        GetPlatforms();
        GetSearch();
    }, []);
    // Title Effect
    useEffect(() => {
        HandleWebsite();
    }, [searchGamesTitle]);
    // Platform Effect
    useEffect(() => {
        HandleWebsite();
    }, [searchGamesPlatform]);

    async function GetPlatforms(){
        const platformsData = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        const platformsJson = await platformsData.json();
        setPlatforms(platformsJson['results']);
    }

    function HandleWebsite(){
        let websiteN = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${size}`;
        if (searchGamesTitle !== ''){
            websiteN = `${websiteN}&search=${searchGamesTitle}`;
        }
        if (searchGamesPlatform && searchGamesPlatform !== -1){
            websiteN = `${websiteN}&platforms=${searchGamesPlatform}`;
        }
        setSearchGamesWebsite(websiteN);
        console.log('Got Search Website: "' + searchGamesWebsite + '"');
    }

    async function GetSearch(){
        if (!searchGamesWebsite || searchGamesWebsite === ''){
            GetPlatforms();
            HandleWebsite();
        }
        // -- Grabbing Game Data
        const searchData = await fetch(searchGamesWebsite);
        const searchJson = await searchData.json();
        setSearchGamesData(searchJson['results']);
        console.log('Search Games Data Updated!');

        let nextButton = document.getElementById('NextPageButton');
        let prevButton = document.getElementById('PreviousPageButton');

        nextButton.hidden = true;
        prevButton.hidden = true;
        if (searchNextWebsite){ // If there is a site for next page then show next button.
            nextButton.hidden = false;
        }
        if (searchPrevWebsite){ // If there is a site for previous page then show previous button.
            prevButton.hidden = false;
        }
    }
    function PreviousPage(){
        console.log("Previous: " + searchPrevWebsite);
        setSearchGamesWebsite(searchPrevWebsite);
        GetSearch();
    }
    function NextPage(){
        console.log("Next: " + searchNextWebsite);
        setSearchGamesWebsite(searchNextWebsite);
        GetSearch();
    }


    return(
        <div className="GamesComponent">
            <h1>Search Games</h1>
            <div className="GamesSearch">
                <input type='text' name='latestSearchTitle' value={searchGamesTitle} onChange={HandleSearchGamesTitleChange}/>
                <select name='platforms' id='platforms' onChange={HandleSearchGamesPlatformChange}>
                    <option value={-1}>All Platforms</option>
                    {
                        platforms.map((todo) => {
                            return(
                                <option value={todo.id}>{todo.name}</option>
                            )
                        })
                    }
                </select>
                <button onClick={GetSearch}>Search</button>
            </div>
            <div className="GamesCards">
            {
                searchGamesData.map((todo) => {
                    return(
                        <div className="GameCard">
                            <h2 className="GameCardTitle">{todo.name}</h2>
                            <h3 className="GameCardReleaseDate">{todo.released}</h3>
                            <img className="GameCardImage" src={todo.background_image} alt='GameImg'/>
                        </div>
                    )
                })
            }
            </div>
            <div className='GamesSearch'>
                <button onClick={PreviousPage} id='PreviousPageButton'>{'<'}</button>
                <button onClick={NextPage} id='NextPageButton'>{'>'}</button>
            </div>
        </div>
    )
}
export default SearchGames;