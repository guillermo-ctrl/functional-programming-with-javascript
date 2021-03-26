let store = {
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

//root is the ID of the HTML element where content will go
const root = document.getElementById('root')

// roverForm is the ID os the dropdown menu to choose a rover
const roverForm = () => {
    //checks first if the dropdown menu is there
    if (document.getElementById('roverDropDown')) return document.getElementById('roverDropDown')
    else return 'root'
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
    let {
        rovers
    } = state

    return `
        <main>
            <div class="sidebar pure-u-1 pure-u-md-1-4">
                <div class="header">
                    <h1 class="brand-title">Mars dashboard</h1>
                    <h2 class="brand-tagline">Latest pictures <br>by NASA Rovers in Mars</h2>
                    <br>
                    ${roverDropDown(DropDown)}
                </div>
            </div>

            <div class="content pure-u-1 pure-u-md-3-4">
                
                <img width="100" height="100" class="logo" src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg">
                    <section class="post">
                        <div class="post-description">
                            <p>
                                ${roverInfo(rovers)}
                            </p>
                        </div>
                    </section>        
            </div>
            
        </main>

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

// If there is a chosen rover in store, show the rover information, else show 'choose a rover' message
const roverInfo = (rovers) => {
    if (Array.isArray(rovers)) {
        return `
            <p class="post-title">Choose a rover!</p>
        `
    } else {
        const latestImages = () => {

            const filtered = rovers.image.photos.filter((x, y, z) => {
                if (y > 0) return x.camera.full_name != z[y - 1].camera.full_name
                else return x = x
            });

            const map1 = filtered.map((x, y) => {
                return (`
                    <img class=pure-img-responsive src='${x.img_src}' max-width:100%; height:auto />
                    <figcaption>Taken with the ${x.camera.full_name}</figcaption>
                `)
            });

            return (map1)
        }
        return (`
        <p class="post-title">${rovers.image.photos[0].rover.name} rover</p>
        <div class="post-description">
            <p>Launch date: ${rovers.image.photos[0].rover.launch_date}</p>
            <p>Landing date: ${rovers.image.photos[0].rover.landing_date}</p>
            <p>Mission status: ${rovers.image.photos[0].rover.status}</p>
            <p>Date of latest pictures: ${rovers.image.photos[0].earth_date}</p>
            ${latestImages()}
        </div>
        
        
    `)
    }
}

// the DropDown function allows us to create a custom dropdown menu
const DropDown = (option1, option2, option3, option4, buttonId, prompt) => {
    return `
        <select id='${buttonId}'>
        <option disabled selected value>${prompt}</option>
        <option>${option4}</option>
        <option>${option1}</option>
        <option>${option2}</option>
        <option>${option3}</option>
        </select>
    `
}

// the roverDropDown function is a higher order function that returns a custom dropdown using the DropDown function
const roverDropDown = (callback) => {
    return callback('curiosity', 'opportunity', 'spirit', 'perseverance', 'roverDropDown', 'Choose a rover')
}

//api call 
const getRoverApi = (state, rover) => {
    let {
        rovers
    } = state
    fetch(`http://localhost:3000/${rover}`)
        .then(res => res.json())
        .then(rovers => updateStore(store, {
            rovers
        }))

    return this.data
}