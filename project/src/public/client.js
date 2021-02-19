// store object that can only be modified using updateStore
let store = {
    currentRover: `Curiosity`,
}

//this puts the general rover api info inside the store. Gets called when window is loaded
const getRovers = (state) => {

    let { rover } = state

    fetch(`http://localhost:3000/all`)
        .then(res => res.json())
        .then(rover => updateStore(store, { rover }))

    
    return this.data
}

const getImage = (state) => {
    if (store.currentRover === "Choose a rover") {
        return ("asd")
    }
    let { image } = state
    fetch(`http://localhost:3000/${store.currentRover}pictures`) //THIS NEEEDS WORK: WHEN "CHOOSE ROVER" THROWS ERROR
        .then(res => res.json())
        .then(image => updateStore(store, { image }))
    return this.data
}



// listening for load event because page should load before any JS is called
//once the page is loaded, the render function is called
window.addEventListener('load', function() {
    render(root, store)  
    root.addEventListener('click', function() {
        
        roverChoice.addEventListener('change', function() {
            updateStore(store, {currentRover: roverChoice.value})
            getImage(store)
            
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

// Pure functions that returns conditional information in the form of html modules 
const RoverInfo = () => {
    //the function starts with an if statement to check if the "rover"
    // key is already in place. If not, the message "loading" will show on the screen
    if (store.rover) {
        const roverNum = () => { // <= this function returns a number depending on the current rover
            switch (store.currentRover) {
                case "Opportunity": return 2;
                case "Curiosity": return 0;
                case "Spirit": return 1;
            }
            return 0
        }
        
        return (`
            <p>Name: ${store.rover.info.rovers[roverNum()].name}</p>
            <p>Launch date: ${store.rover.info.rovers[roverNum()].launch_date}</p>
            <p>Landing date: ${store.rover.info.rovers[roverNum()].landing_date}</p>
            <p>Mission status: ${store.rover.info.rovers[roverNum()].status}</p>
            <p>Date of latest pictures taken: ${store.rover.info.rovers[roverNum()].max_date}</p>
            
        `)
    //otherwise, "loading" shows up   
        } else {
        return (`
            <p>Loading</p>
        `
        )
        }
    }

const roverPic = () => { 
    if (store.image){
        return (`
        <img src="${store.image.image.photos[0].img_src}" height="350px" width="100%" />
    `)
    }
    return (`
        <p></p>
    `)
}

// create content
const App = (state) => {
    let { rover } = state //rover is the rover object in store
    return `
        <header></header> 
        <main>
            <h1>Mars Rover Dashboard</h1>
            <p>Choose a rover</p>
            <section>
                <select id="roverChoice">
                <option>Choose a rover</option>
                <option>Curiosity</option>
                <option>Opportunity</option>
                <option>Spirit</option>
                </select>
            </section>
            ${RoverInfo()}
            ${roverPic()} 
        </main>
        <footer></footer>
    `
}

//make it better:
//make the whole thing run just when "submit" button clicked
//"all" api not needed, just get the general information from image info api

//known issue: 
//curiosity picture not appearing when the site first loads
//"choose a rover" option in dropdown great inefficiency, much code written to get around this problem