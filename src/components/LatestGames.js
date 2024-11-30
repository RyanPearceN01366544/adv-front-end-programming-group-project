import {useState, useEffect} from 'react';
import {API_KEY} from '../sites/Games';

export default function LatestGames({size = 4}){
    let navigation = {previous: '', next: '', page_count: 0}; // Will Re-Add after website functionality is made.
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
        
        navigation = {
            previous: latestJson['previous'], 
            next: latestJson['next'], 
            page_count: Math.ceil(latestJson['count'] / size)
        };
        
        /*
        let nextButton = document.getElementById('NextPageButton');
        let prevButton = document.getElementById('PreviousPageButton');

        nextButton.hidden = true;
        prevButton.hidden = true;
        if (navigation.next){ // If there is a site for next page then show next button.
            nextButton.hidden = false;
        }
        if (navigation.previous){ // If there is a site for previous page then show previous button.
            prevButton.hidden = false;
        }
        */
    }
    function PreviousPage(){
        console.log("Previous: " + navigation.previous);
        setLatestGamesWebsite(navigation.previous);
        GetLatest();
    }
    function NextPage(){
        console.log("Next: " + navigation.next);
        setLatestGamesWebsite(navigation.next);
        GetLatest();
    }

    let temporary = [1, 7, 3, 4, 5]
    //               0, 1, 2, 3, 4
    let temporary2 = {
        0: {
            name: "Whatever",
            title: "Whatever"
        },
        1: {
            
            name: "Whatever2",
            title: "Whatever2"
        }
    }


    return(
        <div className="GamesComponent">
            <h1>Latest Games</h1>
            <div className="GamesSearch">
                <select name='platforms' id='platforms' onChange={HandleLatestGamesPlatformChange}>
                    <option value={-1}>All Platforms</option>
                    {
                        platforms.map((todo) => {
                            return(
                                <option value={todo.id}>{todo.name}</option>
                            )
                        })
                    }
                </select>
                <button onClick={GetLatest}>Search</button>
            </div>
            <div className="GamesCards">
            {
                latestGamesData.map((todo) => {
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

        </div>
    )
    /*
    <div className='GamesSearch'>
        <button onClick={PreviousPage} id='PreviousPageButton'>{'<'}</button>
        <button onClick={NextPage} id='NextPageButton'>{'>'}</button>
    </div>
    */
}