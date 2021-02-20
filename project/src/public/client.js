// store object that can only be modified using updateStore
let store = { 
}

//this function grabs the image data for the current chosen rover. Gets called when user submits a rover choice
const getImage = (state) => {
    //if no rover has been chosen yet, function stops
    if (!store.currentRover) {
        return 
    }
    //else, it will return the image data and put it in the store
    let { image } = state
    fetch(`http://localhost:3000/${store.currentRover}pictures`) //THIS NEEEDS WORK: WHEN "CHOOSE ROVER" THROWS ERROR
        .then(res => res.json())
        .then(image => updateStore(store, { image }))
    return this.data
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', function() {
    //once the page is loaded, the render function is called
    render(root, store)  
   //and an event listener for the submit button is created
    root.addEventListener('click', function() {
        submit.addEventListener("click", function(){
            updateStore(store, {currentRover: roverChoice.value})
            getImage(store)
            })
     });
    
})

// this HOF is used to update the store object
const updateStore = (store, newState) => {
 
    store = Object.assign(store, newState)
    render(root, store)
}

// root is where content goes in the html
const root = document.getElementById('root')

// render sets App as the innerhtml of root
const render = async (root, state) => {
    root.innerHTML = App(state)

}

// Pure function that returns conditional information in the form of an html module 
const RoverInfo = () => {
    
    //the function starts with an if statement to check if an image is already in place
    if (!store.image) {
        return (`
            <p></p>
        `)
    }
    return (`
        <p>Name: ${store.image.image.photos[0].rover.name}</p>
        <p>Launch date: ${store.image.image.photos[0].rover.launch_date}</p>
        <p>Landing date: ${store.image.image.photos[0].rover.landing_date}</p>
        <p>Mission status: ${store.image.image.photos[0].rover.status}</p>
        <p>Date of latest pictures taken: ${store.image.image.photos[0].earth_date}</p>
        <img src="${store.image.image.photos[0].img_src}" height="350px" width="100%" />
        
    `)
    }

// create content
const App = () => {

    return `
        <header></header> 
        <main>
            <h1>Mars Rover Dashboard</h1>
            <p>Choose a rover</p>
                <select id="roverChoice">
                <option disabled selected value> -- Choose a rover -- </option>
                <option>Curiosity</option>
                <option>Opportunity</option>
                <option>Spirit</option>
                <input id="submit" type="submit" value="Get information">
                </select>
            ${RoverInfo()}
        </main>
        <footer></footer>
    `
}