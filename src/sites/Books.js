import {useState, useEffect} from 'react';

export default function Books(){
    const [wtrBooksSite, setwtrBooksSite] = useState = ("https://openlibrary.org/people/mekBot/books/want-to-read.json") 
    const [wtrBooksData, setWtrBooksData] = useState([]);
    const [work, setWork] = useState ([]);
    const [wtrBooksWork, setWtrBooksWork] = useState(-1); 
    function HandleWtrBooksWorkChange(event){
        let temporary = event.target.value;
        setWtrBooksWork(temporary);
        GetBooks();
    }
    useEffect(() => {
        console.log("Work By: " + wtrBooksWork);
        HandleSite();
        GetBooks();
    }, [wtrBooksWork]);

    useEffect(() => {
        GetWorks();
        GetBooks();
    }, []);
    
    async function GetWorks(){
        const workData = await fetch("https://openlibrary.org/people/mekBot/books/want-to-read.json");
        const workJson = await workData.json();
        setWork(workJson['Work']);

    }

    function HandleSite(){
        let SiteN = "https://openlibrary.org/people/mekBot/books/want-to-read.json";
        console.log('Current Book: ' + wtrBooksWork);
        if (wtrBooksWork !== -1){
            let temp = SiteN;
            SiteN = SiteN + "&platforms=" + wtrBooksWork;
        }
        setwtrBooksSite(SiteN);
    }

    async function GetBooks(){
        if (!wtrBooksSite || wtrBooksSite === ''){
            HandleSite();
        }
        const workData = await fetch(wtrBooksSite);
        const workJson = await workData.json();
        setWtrBooksData(workJson['results']);
        
    }
    

    return(
        <div className="BooksComponent">
            <h1>Newest Books</h1>
            <div className="BooksSearch">
                <select name='Work' id='Works' onChange={HandleWtrBooksWorkChange}>
                    <option value={-1}>All Platforms</option>
                    {
                        work.map((todo) => {
                            return(
                                <option value={todo.title}>{todo.author_names}</option>
                            )
                        })
                    }
                </select>
                <button onClick={GetBooks}>Search</button>
            </div>
            <div>
            {
                wtrBooksData.map((todo) => {
                    return(
                        <div>
                            <h2>{todo.title}</h2>
                            <h3>{todo.author_names}</h3>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}