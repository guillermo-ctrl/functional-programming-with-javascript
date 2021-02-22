// store object that can be modified using updateStore
let store = new Object()

//this function grabs the image data for the current chosen rover. Gets called when user submits a rover choice
const getImage = (state) => {
    //if no rover has been chosen yet, function stops
    if (!store.currentRover) {
        return 
    }
    //else, it will return the image data and put it in the store
    const { image } = state
    fetch(`http://localhost:3000/${store.currentRover}pictures`)
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
        submit.addEventListener('click', function(){
            updateStore(store, {currentRover: roverChoice.value})
            getImage(store)
            })
        }
     );
    
})

// this is a higher order function, used to update the store object
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

const roverData = () => {
    if (store.image){
        const roverLocation = store.image.image.photos[0]
        const properties = {
        name: (`<p>Name: ${roverLocation.rover.name}</p>`),
        launch_date: (`<p>Launch date: ${roverLocation.rover.launch_date}</p>`),
        landing_date: (`<p>Landing date: ${roverLocation.rover.landing_date}</p>`), 
        mission_status: (`<p>Mission status: ${roverLocation.rover.status}</p>`),
        latest_picture_date: (`<p>Date of latest picture: ${roverLocation.earth_date}</p>`),
        camera: (`<p>Camera: ${roverLocation.camera.full_name}</p>`),
        latest_picture: (`<p>Latest picture: </p><img src='${store.image.image.photos[0].img_src}' max-width:100%; height:auto />`)
        }
        return Object.values(properties).join('')
    }
}

//higher order function that displays information only if a given store item exists
const displayInfo = (info, storeItem) => {
    if(storeItem) {
        return info
    }
    return (`
    <p></p>
    `)
}

// create content
const App = () => {

    return (`
        <header></header> 
        <main>
            <h1>Mars Rover Dashboard</h1>
                <select id='roverChoice'>
                <option disabled selected value> -- Choose a rover -- </option>
                <option>Curiosity</option>
                <option>Opportunity</option>
                <option>Spirit</option>
                <input id='submit' type='submit' value='Get information'>
                </select>
            ${displayInfo(roverData(), store.image)}
        </main>
        <footer></footer>
    `)
}