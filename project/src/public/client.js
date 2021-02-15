// store object that can only be modified using updateStore
let store = {
    user: '',
    apod: '', //THIS IS WHERE WE LEFT: WE NEED TO MAKE THE APOD BE UPDATED FIRST 
    //IN THE EVENTLISTENER ABOVE
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}


// Example API call
const getImageOfTheDay = (state) => {

    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    
    return this.data
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// this HOF is used to update the store object
const updateStore = (store, newState) => {
 
    store = Object.assign(store, newState)
    render(root, store)
}

// root is where content goes in the html
const root = document.getElementById('root')

// render defines the innerhtml of root
const render = async (root, state) => {
    root.innerHTML = App(state)
}

// Pure function that renders infomation requested from the API call
const ImageOfTheDay = (apod) => {
    const today = new Date()

    //If image does not already exist, or it is not from today -- request it again
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    //the rest of the function is wrapped inside an if statement to check if the "apod"
    // key is already in place. This is done to avoid console error messages
    if (apod) {
    
    // check if the photo of the day is actually type video!
    
    if (store.apod.image.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${store.apod.image.url}">here</a></p>
            <p>${store.apod.image.title}</p>
            <p>${store.apod.image.explanation}</p>
        `)
    } else {
        
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
            
        `
        
        )
    }}
    else {
        return `
                <p>Loading</p>
    `
    } 
}

// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- 
// THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

//MODIFY APOD IN STORE USING THE HOF