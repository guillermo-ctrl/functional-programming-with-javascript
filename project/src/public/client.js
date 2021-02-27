let store = {
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

//root is the ID of the HTML element where content will go
const root = document.getElementById('root')

// roverForm is the ID os the dropdown menu to choose a rover
const roverForm = () => {
    if (document.getElementById("roverDropDown")) return document.getElementById("roverDropDown")
    else return "root"
}

// updateStore is the only function that changes the values of the store object. It then renders the content
const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

//render puts content inside the root html element
const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let { rovers } = state

    return `
        <header></header>
        <main>
            <h1>Mars dashboard</h1>
            <section>
                ${roverDropDown(DropDown)}
                ${roverInfo(rovers)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store) 
})

//listening for form changes to grab the chosen rovers api
root.addEventListener('change', () => {
    getRoverApi(store, roverForm().value)
})

// If there is a chosen rover in store, show the rover information, else show "choose a rover" message
const roverInfo = (rovers) => {
    if (Array.isArray(store.rovers)) {
        return `
            <p>Choose a rover!</p>
        `
    }

    else {
        const latestImages = () => {
            let arr = []
            rovers.image.photos.forEach((element, index) => {
                arr.push(`
                <img src="${rovers.image.photos[index].img_src}" max-width:100%; height:auto />
                <figcaption>Taken with the ${rovers.image.photos[index].camera.full_name}</figcaption>
                `)
            });
            return (arr)
        }
    
        return (`
        <h1>${rovers.image.photos[0].rover.name} rover</h1>
        <p>Launch date: ${rovers.image.photos[0].rover.launch_date}</p>
        <p>Landing date: ${rovers.image.photos[0].rover.landing_date}</p>
        <p>Mission status: ${rovers.image.photos[0].rover.status}</p>
        <p>Date of latest pictures: ${rovers.image.photos[0].earth_date}</p>
        ${latestImages()}
        
    `)}
}

// the DropDown function allows us to create a custom dropdown menu
const DropDown = (option1, option2, option3, option4, buttonId, prompt) => {
    return `
        <select id='${buttonId}'>
        <option disabled selected value> -- ${prompt} -- </option>
        <option>${option1}</option>
        <option>${option2}</option>
        <option>${option3}</option>
        <option>${option4}</option>
        </select>
    `
}

// the roverDropDown function is a high order function that returns a custom dropdown using the DropDown function
const roverDropDown = (callback) => {
    return callback("curiosity", "opportunity", "spirit", "perseverance", "roverDropDown", "choose a rover")
}

//api call 
const getRoverApi = (state, rover) => {
    let { rovers } = state
    fetch(`http://localhost:3000/${rover}`)
        .then(res => res.json())
        .then(rovers => updateStore(store, { rovers }))

    return this.data
}