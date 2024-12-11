import {useState, useEffect} from 'react';
import {API_KEY} from '../sites/Games';

function LatestGames({size = 4}){
    // Using a normal variable as the website updates slow.
    let latestWebsite = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&page_size=${size}`;
    const [latestGamesData, setLatestGamesData] = useState([]);
    // -- Search Variables --
    const [platforms, setPlatforms] = useState([]);
    const [latestGamesPlatform, setLatestGamesPlatform] = useState(-1);
    function HandleLatestGamesPlatformChange(event){
        setLatestGamesPlatform(event.target.value);
    }
    let latestGamesPageR = -1; // This is what controls if next is hidden or not as useState seems a bit behind.
    const [latestGamesPage, setLatestGamesPage] = useState(1);
    let latestGamesMaxPageR = -1; // This is what controls if next is hidden or not as useState seems a bit behind.
    const [latestGamesMaxPage, setlatestGamesMaxPage] = useState(-1);

    // Initial Effect
    useEffect(() => { // Placing here as this is what the site will do first when refreshed/loaded!
        GetPlatforms();
        GetLatest();
    }, [true]);
    // Platform Effect
    useEffect(() => {
        HandleWebsite();
    }, [latestGamesPlatform]);
    // Page Effect
    useEffect(() => {
        HandleWebsite();
        GetLatest();
    }, [latestGamesPage])

    async function GetPlatforms(){
        const platformsData = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        const platformsJson = await platformsData.json();
        setPlatforms(platformsJson['results']);
    }


    function HandleWebsite(){
        let websiteN = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&page_size=${size}`;

        if (latestGamesPage < 1) {
            setLatestGamesPage(1);            
        }

        let page = latestGamesPage;
        if (page){
            websiteN = `${websiteN}&page=${page}`;
        }
        if (latestGamesPlatform && latestGamesPlatform !== -1) {
            websiteN = `${websiteN}&platforms=${latestGamesPlatform}`;
        }
        latestWebsite = websiteN;
    }
    async function GetLatest(doubleCheck_ = false){
        if (!latestWebsite || latestWebsite === ''){
            GetPlatforms();
            HandleWebsite();
        }
        // -- Grabbing Game Data
        const searchData = await fetch(latestWebsite);
        const searchJson = await searchData.json();
        setLatestGamesData(searchJson['results']);
        setlatestGamesMaxPage(Math.ceil(searchJson['count'] / size)); // The count is how many games are in the list, so I can divide it by the size (the amount of games that appear) to get the number of pages.
        CheckPageButtons();
    }
    function OnClickSubmit(){
        setLatestGamesPage(1);
        CheckPageButtons();
        GetLatest();
    }


    function PreviousPage(){
        if (latestGamesPage !== 1) {
            setLatestGamesPage(latestGamesPage - 1);
        }
        CheckPageButtons();
    }
    function NextPage(){
        if (latestGamesPage < latestGamesMaxPage) {
            setLatestGamesPage(latestGamesPage + 1);
        }
        CheckPageButtons();
    }
    function CheckPageButtons(){
        let nextButton = document.getElementById('LatestNextPageButton');
        let prevButton = document.getElementById('LatestPrevPageButton');
        latestGamesPageR = latestGamesPage;
        latestGamesMaxPageR = latestGamesMaxPage;

        prevButton.hidden = false;
        nextButton.hidden = false;
        if (latestGamesPageR === 1){
            prevButton.hidden = true;
        }
        else if (latestGamesPageR === latestGamesMaxPageR){
            nextButton.hidden = true;
        }
    }


    return(
        <div className="GamesComponent border-2 border-gray-500 mx-5 mb-4">
            <h1>Search Games</h1>
            <div className="GamesSearch">
                <select name='platforms' id='platforms' className='bg-gray-400 rounded-sm text-center mr-1 h-6' onChange={HandleLatestGamesPlatformChange}>
                    <option value={-1}>All Platforms</option>
                    {
                        platforms.map((todo) => {
                            return(
                                <option value={todo.id}>{todo.name}</option>
                            )
                        })
                    }
                </select>
                <button onClick={OnClickSubmit} className='bg-gray-500 rounded-sm border-s-4 border-gray-400 h-6 px-2 text-center'>Search</button>
            </div>
            <div className="GamesCards">
            {
                latestGamesData.map((todo) => {
                    return(
                        <div className="GameCard">
                            <h2 className="GameCardTitle">{todo.name}</h2>
                            <h3 className="GameCardReleaseDate">{todo.released}</h3>
                            <img className="GameCardImage self-center" src={todo.background_image} alt='GameImg'/>
                        </div>
                    )
                })
            }
            </div>
            <div className='GamesSearch'>
                <div>
                    <button onClick={PreviousPage} id='LatestPrevPageButton' className='GamesPageButton bg-gray-400 rounded px-1 mr-1 text-center'>{'Prev.'}</button>
                    <button onClick={NextPage} id='LatestNextPageButton' className='GamesPageButton bg-gray-400 rounded px-1 text-center'>{'Next'}</button>
                </div>
                <div>
                    <p>{latestGamesPage} out of {latestGamesMaxPage}</p>
                </div>
            </div>
        </div>
    )
}
export default LatestGames;