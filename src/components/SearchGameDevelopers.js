import {useState, useEffect} from 'react';
import {API_KEY} from '../sites/Games';

function SearchDevelopers({size = 9}){
    // Using a normal variable as the website updates slow.
    let developersWebsite = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${size}`;
    const [developersData, setDevelopersData] = useState([]);
    // -- Search Variables --
    const [developersSearchTitle, setDevelopersSearchTitle] = useState('');
    function HandleDevelopersSearchTitleChange(event){
        setDevelopersSearchTitle(event.target.value);
    }
    let developersGamesPageR = -1; // This is what controls if next is hidden or not as useState seems a bit behind.
    const [developersGamesPage, setDevelopersPage] = useState(1);
    let developersGamesMaxPageR = -1; // This is what controls if next is hidden or not as useState seems a bit behind.
    const [developersGamesMaxPage, setSearchGamesMaxPage] = useState(-1);

    // Initial Effect
    useEffect(() => { // Placing here as this is what the site will do first when refreshed/loaded!
        GetDevelopers();
    }, [true]);
    // Title Effect
    useEffect(() => {
        HandleWebsite();
    }, [developersSearchTitle]);
    // Page Effect
    useEffect(() => {
        HandleWebsite();
        GetDevelopers();
    }, [developersGamesPage])

    function HandleWebsite(){
        let websiteN = `https://api.rawg.io/api/developers?key=${API_KEY}&page_size=${size}`;

        if (developersGamesPage < 1) {
            setDevelopersPage(1);            
        }

        let page = developersGamesPage;
        if (page){
            websiteN = `${websiteN}&page=${page}`;
        }
        if (developersSearchTitle !== '') {
            let titleFixed = developersSearchTitle.replaceAll(' ', '+');
            websiteN = `${websiteN}&search=${titleFixed}`;
        }
        developersWebsite = websiteN;
    }
    async function GetDevelopers(doubleCheck_ = false){
        if (!developersWebsite || developersWebsite === ''){
            HandleWebsite();
        }
        // -- Grabbing Game Data
        const searchData = await fetch(developersWebsite);
        const searchJson = await searchData.json();
        setDevelopersData(searchJson['results']);
        setSearchGamesMaxPage(Math.ceil(searchJson['count'] / size)); // The count is how many games are in the list, so I can divide it by the size (the amount of games that appear) to get the number of pages.
        CheckPageButtons();
    }
    function OnClickSubmit(){
        setDevelopersPage(1);
        GetDevelopers();
    }


    function PreviousPage(){
        if (developersGamesPage !== 1) {
            setDevelopersPage(developersGamesPage - 1);
        }
        CheckPageButtons();
    }
    function NextPage(){
        if (developersGamesPage < developersGamesMaxPage) {
            setDevelopersPage(developersGamesPage + 1);
        }
        CheckPageButtons();
    }
    function CheckPageButtons(){
        let nextButton = document.getElementById('DevelopersNextPageButton');
        let prevButton = document.getElementById('DevelopersPrevPageButton');
        developersGamesPageR = developersGamesPage;
        developersGamesMaxPageR = developersGamesMaxPage;

        prevButton.hidden = false;
        nextButton.hidden = false;
        if (developersGamesPageR === 1){
            prevButton.hidden = true;
        }
        else if (developersGamesPageR === developersGamesMaxPageR){
            nextButton.hidden = true;
        }
    }


    return(
        <div className="GamesComponent border-2 border-gray-500 mx-5">
            <h1>Search Games</h1>
            <div className="GamesSearch">
                <input type='text' name='gameSearchTitle' className='GamesSearchTitle rounded mr-1 h-6 border-solid border-2 border-gray-400' value={developersSearchTitle} onChange={HandleDevelopersSearchTitleChange}/>
                <button onClick={OnClickSubmit} className='bg-gray-500 rounded-sm border-s-4 border-gray-400 h-6 px-2 text-center'>Search</button>
            </div>
            <div className="GamesCards">
            {
                developersData.map((todo) => {
                    return(
                        <div className="GameCard">
                            <h2 className="GameCardTitle">{todo.name}</h2>
                            <img className="GameCardImage self-center" src={todo.image_background} alt='GameImg'/>
                        </div>
                    )
                })
            }
            </div>
            <div className='GamesSearch'>
                <div>
                    <button onClick={PreviousPage} id='DevelopersPrevPageButton' className='GamesPageButton bg-gray-400 rounded px-1 mr-1 text-center'>{'Prev.'}</button>
                    <button onClick={NextPage} id='DevelopersNextPageButton' className='GamesPageButton bg-gray-400 rounded px-1 text-center'>{'Next'}</button>
                </div>
                <div>
                    <p>{developersGamesPage} out of {developersGamesMaxPage}</p>
                </div>
            </div>
        </div>
    )
}
export default SearchDevelopers;