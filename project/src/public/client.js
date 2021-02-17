// store object that can only be modified using updateStore
let store = {
    currentRover: ``,
}

//this puts the api info inside the store. Gets called when window is loaded
const getRovers = (state) => {

    let { rover } = state

    fetch(`http://localhost:3000/all`)
        .then(res => res.json())
        .then(rover => updateStore(store, { rover }))

    
    return this.data
}

// listening for load event because page should load before any JS is called
//once the page is loaded, the render function is called
window.addEventListener('load', function() {
    render(root, store)  
    root.addEventListener('click', function() {
        
        roverChoice.addEventListener('change', function() {
            updateStore(store, {currentRover: roverChoice.value})
            })
    });
    getRovers(store)
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

// Pure function that returns conditional information as html modules 
const RoverInfo = (rover) => {

    const today = new Date()
    //Request images again if new ones exist
    if (!rover || rover.date === today.getDate() ) {
        getRovers(store)
    }
    //the rest of the function is wrapped inside an if statement to check if the "apod"
    // key is already in place. This is done to avoid console error messages
    if (store.rover) {
        if (roverChoice.value == "Curiosity") {return (`
            <p>${store.rover.image.rovers[0].name}</p>
        `)}
        else if (roverChoice.value == "Opportunity") {return (`
        <p>${store.rover.image.rovers[2].name}</p>
        `)}
        else if (roverChoice.value == "Spirit") {return (`
        <p>${store.rover.image.rovers[1].name}</p>
        `)}
        else {return (`
        <p></p>
        `)}
    } else {
        return (`
            <p>Loading</p>
        `
        )
    }}
    
// create content
const App = (state) => {
    let { rover } = state //rover is the rover object in store
    return `
        <header></header> 
        <main>
            <h1>Mars Rover Dashboard</h1>
            <section>
                <select id="roverChoice">
                <option>Choose a rover</option>
                <option>Curiosity</option>
                <option>Opportunity</option>
                <option>Spirit</option>
                </select>
                ${RoverInfo(store.rover)}
            </section>
        </main>
        <footer></footer>
    `
}
