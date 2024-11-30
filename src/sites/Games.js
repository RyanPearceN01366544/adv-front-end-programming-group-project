import LatestGames from '../components/LatestGames';
import SearchDevelopers from '../components/SearchGameDevelopers';
import SearchGames from '../components/SearchGames';
import './Games.css'

// -- Used for Components!
export const API_KEY = '158f5d775b994d039796d401a20c9f08';
export function GetKey(){
    return API_KEY;
};

function Games(){
    return(
        <div>
            <LatestGames></LatestGames>
            <SearchGames size={10}></SearchGames>
            <SearchDevelopers></SearchDevelopers>
        </div>
    )
}
export default Games;