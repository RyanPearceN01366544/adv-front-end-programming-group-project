import {useState, useEffect} from 'react';
import {API_KEY, MISSING_IMAGE} from '../sites/Games';

function SearchGames({size = 4}){
    // Using a normal variable as the website updates slow.
    let searchWebsite = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${size}`;
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
    let searchGamesPageR = -1; // This is what controls if next is hidden or not as useState seems a bit behind.
    const [searchGamesPage, setSearchGamesPage] = useState(1);
    let searchGamesMaxPageR = -1; // This is what controls if next is hidden or not as useState seems a bit behind.
    const [searchGamesMaxPage, setSearchGamesMaxPage] = useState(-1);

    // Initial Effect
    useEffect(() => { // Placing here as this is what the site will do first when refreshed/loaded!
        GetPlatforms();
        GetSearch();
    }, [true]);
    // Title Effect
    useEffect(() => {
        HandleWebsite();
    }, [searchGamesTitle]);
    // Platform Effect
    useEffect(() => {
        HandleWebsite();
    }, [searchGamesPlatform]);
    // Page Effect
    useEffect(() => {
        HandleWebsite();
        GetSearch();
    }, [searchGamesPage])

    async function GetPlatforms(){
        const platformsData = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        const platformsJson = await platformsData.json();
        setPlatforms(platformsJson['results']);
    }


    function HandleWebsite(){
        let websiteN = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${size}`;
        if (searchGamesPage < 1) {
            setSearchGamesPage(1);            
        }

        let page = searchGamesPage;
        if (page){
            websiteN = `${websiteN}&page=${page}`;
        }
        if (searchGamesPlatform && searchGamesPlatform !== -1) {
            websiteN = `${websiteN}&platforms=${searchGamesPlatform}`;
        }
        if (searchGamesTitle !== '') {
            let titleFixed = searchGamesTitle.replaceAll(' ', '+');
            websiteN = `${websiteN}&search=${titleFixed}`;
        }
        searchWebsite = websiteN;
    }
    async function GetSearch(doubleCheck_ = false){
        if (!searchWebsite || searchWebsite === ''){
            GetPlatforms();
            HandleWebsite();
        }
        // -- Grabbing Game Data
        const searchData = await fetch(searchWebsite);
        const searchJson = await searchData.json();
        setSearchGamesData(searchJson['results']);
        setSearchGamesMaxPage(Math.ceil(searchJson['count'] / size)); // The count is how many games are in the list, so I can divide it by the size (the amount of games that appear) to get the number of pages.
        CheckPageButtons();
    }

    // -- INPUT FUNCTIONS --
    const OnSearchInputKeyUp = (event) => { // Adds functionality by making it submit on enter when interacting with the title search input.
        if (event.key === 'Enter'){ // Gets the key that was let go in the event.
            OnClickSubmit(); // Emulates submitting.
        }
    }
    function OnClickSubmit() { // Found out recently that I probably could've used a form but it's a bit too late for that now. 
        setSearchGamesPage(1); // Regardless, this function simply resets the page back to 1.
        GetSearch(); // Then refreshes the list of games.
    }

    
    function PreviousPage(){
        if (searchGamesPage !== 1) {
            setSearchGamesPage(searchGamesPage - 1);
        }
        CheckPageButtons();
    }
    function NextPage(){
        if (searchGamesPage < searchGamesMaxPage) {
            setSearchGamesPage(searchGamesPage + 1);
        }
        CheckPageButtons();
    }
    function CheckPageButtons(){
        let nextButton = document.getElementById('SearchNextPageButton');
        let prevButton = document.getElementById('SearchPrevPageButton');

        if (window.location.pathname == '/Games'){ // Adding this to hopefully stop website from returning an error randomly when switching sites.
            searchGamesPageR = searchGamesPage;
            searchGamesMaxPageR = searchGamesMaxPage;

            prevButton.hidden = false;
            nextButton.hidden = false;
            if (searchGamesPageR === 1){
                prevButton.hidden = true;
            }
            else if (searchGamesPageR === searchGamesMaxPageR){
                nextButton.hidden = true;
            }
        }
    }


    return(
        <div className="GamesComponent border-2 border-gray-500 mx-5">
            <u className="GamesComponentTitle">Search Games</u>
            <div className="GamesSearch">
                <input type='text' name='gameSearchTitle' value={searchGamesTitle} onChange={HandleSearchGamesTitleChange} onKeyUp={OnSearchInputKeyUp} id='GamesSearchInputField' className='GamesSearchTitle bg-gray-400 rounded mr-1 h-6 border-solid border-2 border-gray-400'/>
                <select name='platforms' id='platforms' className='bg-gray-400 rounded-sm text-center mr-1 h-6' onChange={HandleSearchGamesPlatformChange}>
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
                searchGamesData.map((todo) => {
                    return(
                        <div className="GameCard">
                            <u className="GameCardTitle">{todo.name}</u>
                            <h3 className="GameCardReleaseDate">Release Date: {todo.released}</h3>
                            <img className="GameCardImage self-center" src={todo.background_image ? todo.background_image : MISSING_IMAGE}/>
                        </div>
                    )
                })
            }
            </div>
            <div className='GamesSearch'>
                <div>
                    <button onClick={PreviousPage} id='SearchPrevPageButton' className='GamesPageButton bg-gray-400 rounded px-1 mr-1 text-center'>{'Prev.'}</button>
                    <button onClick={NextPage} id='SearchNextPageButton' className='GamesPageButton bg-gray-400 rounded px-1 text-center'>{'Next'}</button>
                </div>
                <div>
                    <p>{searchGamesPage} out of {searchGamesMaxPage}</p>
                </div>
            </div>
        </div>
    )
}
export default SearchGames;