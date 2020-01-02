const impressionsURL = "http://localhost:3000/impressions"
const celebritiesURL = "http://localhost:3000/celebrities"
const usersURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", (event) => {
  fetchUsers()

})

function fetchUsers() {
  fetch(usersURL)
  .then(res => res.json())
  .then(json => {
    waitForLogin(json.data)
  })
}

function waitForLogin(users) {
    document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault()
    let value = event.target.username.value
    let currentUser = users.find(user => user.attributes.username == value)
    if (currentUser == undefined) {
            fetch(usersURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'},
              body: JSON.stringify({username: value})})
      .then(res => res.json())
      .then(currentUser => {
        fetchCelebrities(currentUser.data)
        renderCurrentUser(currentUser.data)
        event.target.username.value = ""
      })
    }
    else {
      fetchCelebrities(currentUser)
      renderCurrentUser(currentUser)
      event.target.username.value = ""
    }
  })

}
function renderCurrentUser(currentUser) {
  let loggedIn = document.querySelector("#loggedIn")
  let logout = document.querySelector("#logout")
  document.querySelector("#login").style.display = "none"
  document.querySelector("#chooseCeleb").style.display = "block"
  document.querySelector("#afterLogin").style.display = "block"
  document.querySelector("#celebrityNames").style.display = "block"
  loggedIn.innerText = `Logged in as ${currentUser.attributes.username}`
  loggedIn.setAttribute("class", `user-${currentUser.id}`)
  logout.style.display = "block"
  logout.addEventListener("click", event => logoutEvent(event))
}

function logoutEvent(event) {
  let loggedIn = document.querySelector("#loggedIn")
  loggedIn.innerText = `Please Login!`
  document.querySelector("#login").style.display = "block"
  document.querySelector("#chooseCeleb").style.display = "none"
  document.querySelector("#celebrityNames").style.display = "none"
  document.querySelector("#afterLogin").style.display = "none"
  event.target.style.display = "none"
}

function fetchCelebrities(){
  document.querySelector("#celebrityNames").innerHTML = ""
    fetch(celebritiesURL)
    .then(res => res.json())
    .then(function(json) {
      json.data.forEach(celeb => {
        let celebName = document.createElement("div")
        celebName.setAttribute("class", `celebName`)
        celebName.innerHTML = `
        <p> ${celeb.attributes.name} </p>
        `
        addCelebrity(celeb)
        document.querySelector("#celebrityNames").appendChild(celebName)
        celebName.addEventListener("click", (event) => displayCeleb(event, celeb))
  
      })
    })
}
function displayCeleb(event, celeb){
  let celebElement = document.querySelector(`#box-${celeb.id}`)
  let celebContainer = document.querySelector("#celebContainer")
  let children = celebContainer.children
  console.log(children)
  for(let i = 0; i < children.length; i++){
    
    children[i].style.display = "none"}

  celebElement.style.display = "block"
}

function addCelebrity(celeb) {
    let newCeleb = document.createElement("div")
    let impressions = celeb.relationships.impressions
      newCeleb.setAttribute("id", `box-${celeb.id}`)
      newCeleb.setAttribute("class", "box")
      newCeleb.style.display = "none"
      newCeleb.innerHTML = `
      <h3> ${celeb.attributes.name} </h3>
      <img src=${celeb.attributes.image} width=300>
      <p>${celeb.attributes.description}</p>
      <p>"${celeb.attributes.audio_text}"</p>
      <audio controls>
      <source src="http://localhost:3000/${celeb.attributes.audio_url}" type="audio/mpeg">
        Your browser does not support the <code>audio</code> element. 
      </audio>
      `
      document.querySelector("#celebContainer").appendChild(newCeleb)
      
      newImpression = document.createElement("form")
      newImpression.setAttribute("id", `newImpression-${celeb.id}`)  
      newImpression.innerHTML = `
      <p> Add your impression below: </p>
      <input type="file" id="input-${celeb.id}" accept="audio/*" capture>

      <h3> The Impressions: </H3>
      `
          
      newCeleb.appendChild(newImpression)
      document.querySelector(`#input-${celeb.id}`).addEventListener("change", (event) => postImpression(event, celeb, newCeleb))
      addImpressions(impressions, newCeleb)
  }

function addImpressions(impressions, newCeleb) {
    impressions.data.forEach(imp => {
      fetch(`${impressionsURL}/${imp.id}/audio`)
      .then(res => res.json())
      .then(function(json) {
        let newImpression = document.createElement("div")
        newImpression.setAttribute("id", `imp-${imp.id}`)
        newImpression.innerHTML = `
        <p> ${json.username}'s Impression: </p>
        <audio controls>
        <source src="${json.link}" type="audio/mpeg">
          Your browser does not support the <code>audio</code> element. 
        </audio>

        `

        newCeleb.appendChild(newImpression)
      })
    })
  }

  function postImpression(celeb, newCeleb) {
    let loggedIn = document.querySelector("#loggedIn")
    let user = (loggedIn.className).split("-")[1]
    let file = document.querySelector(`#input-${celeb.id}`).files[0]
    const formData = new FormData()
          formData.append('impression[user_id]', user),
          formData.append('impression[celebrity_id]', celeb.id),
          formData.append('impression[audio_impression]', file)
      
        fetch(impressionsURL, {
          method: 'POST',
          body: formData })
      .then(res => res.json())
      .then(json => {
        renderNewImpression(json, celeb, newCeleb)
        document.querySelector(`#input-${celeb.id}`).files[0] = null})
  }

  function renderNewImpression(json, celeb, newCeleb) {
    
    let newImpression = document.createElement("div")
    newImpression.setAttribute("id", `imp-${json.id}`)
    newImpression.innerHTML = `
    <p> ${json.username}'s Impression: </p>
    <audio controls>
    <source src="${json.link}" type="audio/mpeg">
      Your browser does not support the <code>audio</code> element. 
    </audio>
    `
    newCeleb.appendChild(newImpression)

  }
        
  
