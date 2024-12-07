export default function Home(){
    return(
        <div>
            <h1>Home</h1>
            <h1 className='text-lg'>Welcome to our Group Website!</h1>
            <p className='text-wrap my-5'>
                Hello! Welcome to our temporary home page.
                In here is going to be our about page and button links to the different sites in this project.
                Below is a list of which team members worked on which sites as we seperated our work as evenly as we could, with a few exceptions.
                These examples are extremely limited and are currently a work in progress anyway, being this page and the navigation bar created by Ryan.
                There is just a note or two I want to leave down below for the games site that I want you to be aware of.
                Thanks and I hope you enjoy!
            </p>
            <div className='flex-col my-10'>
                <p>Adel Ali - Books</p>
                <p>Dipin Bhandari - Music</p>
                <p>Shajay Cockrane - Movies</p>
                <p>Ryan Pearce - Games</p>
            </div>
            <p className='my-10 text-wrap'>
                The only heads up I wanted you to note about Games is that I went with this sort of media as I was unaware how difficult it would be to get one as I kept finding myself at road-blocks.
                So I worked on the API first and are still working on it for now.
                The search function at the bottom of the page works but only the latest section's buttons for going to the next and previous page are working, though, you need to double click on the button to go to the next page.
                Lastly, I plan on making these two individual components into one but that will be for the future. Thanks! - Ryan
            </p>
        </div>
    )
}