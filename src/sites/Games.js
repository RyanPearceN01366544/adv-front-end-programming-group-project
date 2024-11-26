import {useState, useRef} from 'react';
import './Games.css'

export default function Games(){
// -- COMMENTED OUT UNTIL I CAN ASK ABOUT CORS!
    const [appData, setAppData] = useState([])
    const gameTitle = useRef('')
    async function GamingAPI() {
        if (gameTitle.current.value !== '' && gameTitle.current.value !== ' '){            
            let title = gameTitle.current.value.replaceAll(' ', '+') // Replacing the search with '+' for URL.
//            const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`) -- CheapShark (Decent Alternative without API Key.)
            // TODO: Change URL based on which fields have something inside of them.
            const response = await fetch(`https://api.rawg.io/api/games?key=158f5d775b994d039796d401a20c9f08&search=${title}`, {
                method: "GET",
                search: {gameTitle},
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const jsonData = await response.json();
            setAppData(jsonData['results'])
        }
    }

    const HandleGameTitleChange = (event) => {
        gameTitle.current.value = event.target.value
    }

    function GetGameInfo(){ // On Search...
        if (gameTitle.current.value.length > 1){
            GamingAPI() // Get Game Information.
        }
    }

    if (appData !== null && gameTitle.current.value !== '' && gameTitle.current.value !== ' '){ // If there is something to return then return it.
        return(
            <div className="GamesComponent">
                <div className="GamesSearchSection">
                    <input ref={gameTitle} type='text' name='game_title' onChange={HandleGameTitleChange}/>
                    <button onClick={GetGameInfo}>Search</button>
                </div>
                <div className="GamesSection">
                    <h1>Latest Games</h1>
                    <div className="GamesCards">
                        {
                            appData.map((todo) => {
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
            </div>
        )
    }
    else{ // -- Temporary Code!
        return(
            <div className="GamesComponent">
                <div className="GamesSearchSection">
                    <input ref={gameTitle} type='text' name='game_title' onChange={HandleGameTitleChange}/>
                    <button onClick={GetGameInfo}></button>
                </div>
                <div className="GamesSection">
                    <h1>No Games!</h1>
                </div>
            </div>
        )
    }
}