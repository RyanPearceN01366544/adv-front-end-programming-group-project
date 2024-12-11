import LatestGames from '../components/LatestGames';
import SearchDevelopers from '../components/SearchGameDevelopers';
import SearchGames from '../components/SearchGames';
//import GamesList from '../components/GamesList';
import './Games.css'

// -- Used for Components!
export const API_KEY = '158f5d775b994d039796d401a20c9f08';
export const MISSING_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png';

function Games(){
    // For Original Application, Use This!
    return(
        <div className='bg-gray-900 py-2'>
            <LatestGames></LatestGames>
            <SearchGames size={8}></SearchGames>
            <SearchDevelopers></SearchDevelopers>
        </div>
    )

    // Temporarily Edited out code for testing!
    /*
    return (
        <div>
            <GamesList sectionTitle='Latest Games' ordering='-released' searchOptions={['platform']}/>
            <GamesList sectionTitle='Search Games' size={8} searchOptions={['title', 'platform']}/>
        </div>
    )
    */
}
export default Games;