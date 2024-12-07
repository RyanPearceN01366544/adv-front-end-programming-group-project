import {useState, useEffect} from 'react';
import {API_KEY} from '../sites/Games';

export default function LatestGames({size = 4}){
    const [latestGamesWebsite, setLatestGamesWebsite] = useState(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&page_size=${size}`);
    const [latestGamesData, setLatestGamesData] = useState([]);
    // -- Search Variables
    const [platforms, setPlatforms] = useState([]);
    const [latestGamesPlatform, setLatestGamesPlatform] = useState(-1);
    function HandleLatestGamesPlatformChange(event){
        let temporary = event.target.value;
        setLatestGamesPlatform(temporary);
        GetLatest();
    }
    const [firstTimeLoading, setFirstTimeLoading] = useState(true); // Temporary Fix to Strange Buttons
    const [latestNextWebsite, setLatestNextWebsite] = useState('');
    const [latestPrevWebsite, setLatestPrevWebsite] = useState('');
    useEffect(() => {
        console.log("Platform: " + latestGamesPlatform);
        HandleWebsite();
        GetLatest();
    }, [latestGamesPlatform]);

    useEffect(() => { // Placing here as this is what the site will do first when refreshed/loaded!
        GetPlatforms();
        GetLatest();
    }, []);

    async function GetPlatforms(){
        const platformsData = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        const platformsJson = await platformsData.json();
        setPlatforms(platformsJson['results']);

    }

    function HandleWebsite(){
        let websiteN = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&page_size=${size}`;
        console.log('Current Platform: ' + latestGamesPlatform);
        if (latestGamesPlatform !== -1){
            // The only reason why there is no title search with release is because results become very strange.
            // For instance, I've searched up 'Batman' and it would give me the latest games that start with 'ba' or something similar.
            let temp = websiteN;
            websiteN = websiteN + "&platforms=" + latestGamesPlatform;
            console.log("-- Updated Website --\nFrom:\t" + temp + "\nTo:\t" + websiteN);
        }
        setLatestGamesWebsite(websiteN);
    }

    async function GetLatest(){
        if (!latestGamesWebsite || latestGamesWebsite === ''){
            HandleWebsite();
        }
        // -- Grabbing Game Data
        const latestData = await fetch(latestGamesWebsite);
        const latestJson = await latestData.json();
        setLatestGamesData(latestJson['results']);
        setLatestNextWebsite(latestJson['next']);
        setLatestPrevWebsite(latestJson['previous']);
        
        let nextButton = document.getElementById('NextPageButton');
        let prevButton = document.getElementById('PreviousPageButton');

        nextButton.hidden = true;
        prevButton.hidden = true;
        if (latestJson['next']){ // If there is a site for next page then show next button.
            nextButton.hidden = false;
        }
        if (latestJson['previous']){ // If there is a site for previous page then show previous button.
            prevButton.hidden = false;
        }
    }
    function PreviousPage(){
        console.log("Previous: " + latestPrevWebsite);
        setLatestGamesWebsite(latestPrevWebsite);
        GetLatest();
    }
    function NextPage(){
        console.log("Next: " + latestNextWebsite);
        setLatestGamesWebsite(latestNextWebsite);
        GetLatest();
    }

    return(
        <div className="GamesComponent">
            <h1>Latest Games</h1>
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
                <button onClick={GetLatest} className='bg-gray-500 rounded-sm border-s-4 border-gray-400 h-6 px-2 text-center'>Search</button>
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
                <button onClick={PreviousPage} id='PreviousPageButton' className='GamePageButton rounded px-1 mr-1'>{'<'}</button>
                <button onClick={NextPage} id='NextPageButton' className='GamePageButton rounded px-1'>{'>'}</button>
            </div>
        </div>
    )
}