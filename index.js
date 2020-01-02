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
                'Accpet':'application/json'},
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
    fetch(celebritiesURL)
    .then(res => res.json())
    .then(function(json) {
      json.data.forEach(celeb => {
        document.querySelector("#chooseCeleb")
        let celebName = document.createElement("div")
        celebName.setAttribute("class", `celeb-celeb.attributes.id`)
        celebName.innerHTML = `
        <p> ${celeb.attributes.name} </p>
        `
        addCelebrity(celeb)
        document.querySelector("#chooseCeleb").appendChild(celebName)
        celebName.addEventListener("click", (event) => displayCeleb(event))
  
      })
    })
}
function displayCeleb(event){
  celebId = event.target.class
  celeb = document.querySelector(`#celeb-${celebId}`)
  // celeb.style.display = "block"
}

function addCelebrity(celeb) {
    let newCeleb = document.createElement("div")
    let impressions = celeb.relationships.impressions
      newCeleb.setAttribute("id", celeb.id)
      newCeleb.setAttribute("class", "box")
      // newCeleb.style.display = "none"
      newCeleb.innerHTML = `
      <h3> ${celeb.attributes.name} </h3>
      <img src=${celeb.attributes.image} width=100>
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

      <h3> Here Other's Impressions! </H3>
      `
          
      newCeleb.appendChild(newImpression)
      document.querySelector(`#input-${celeb.id}`).addEventListener("change", (event) => postImpression(event, celeb))
      addImpressions(impressions, newCeleb)
  }

  function addImpressions(impressions, newCeleb) {
    impressions.data.forEach(imp => {
      fetch(`${impressionsURL}/${imp.id}/audio`)
      .then(res => res.json())
      .then(function(json) {
        let newImpression = document.createElement("div")
        newImpression.setAttribute("id", imp.id)
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

  function postImpression(event, celeb) {
    console.log(event.value)
    console.log(document.querySelector(`newImpression-${celeb.id}`))
  }
    // const formData = new FormData()
    //       formData.append('impression[user_id]', 1),
    //       formData.append('impression[celebrity_id]', 1),
    //       formData.append('impression[audio_impression]', event.file)
      
      
  //       fetch(impressionsURL, {
  //           method: 'POST',
  //           body: formData
  //       })
  //       .then(res => res.json())
  //       .then(json => console.log(json))
  
  // }


    // var audio = new Audio(`http://localhost:3000/${apiData.data[0].attributes.audio_url}`)
    // document.addEventListener("click", (event) => audio.play())

    

    // const innerBox= Array.from(document.getElementsByClassName("innerBox"))
    // for(let i = 0; i< innerBox.length; i++){
    //     let newDiv = document.createElement('div')
    //     let newValue = 
    //    `<h3>${apiData.data[i].attributes.name}</h3>
    //     <p>${apiData.data[i].attributes.description}</p>
    //     <p>${apiData.data[i].attributes.audio_text}</p>
        
    //     <button id="button"> Listen</button> >>>> <button id="button2">Record</button>`
    //     newDiv.innerHTML = newValue
    //     innerBox[i].appendChild(newDiv)
    // }
        // <audio controls> <source src="samples/happyhungergames2.mp3
        // <audio src="samples/happyhungergames2.mp3" loop>,
        // " type="audio/mpeg"> ${apiData.data[i].attributes.audio}</audio>

    // const picBox = Array.from(document.getElementsByClassName("box"))
    // for(let i = 0; i< picBox.length; i++){
    //     let newDiv = document.createElement('div')
    //     let newValue = 
    //    `<a href="" class="celebImage"><img src="https://target.scene7.com/is/image/Target/GUEST_10348e87-6152-4bd0-b1fe-d96ea230800c?wid=488&hei=488&fmt=pjpeg" alt=""/></a>`
    //     newDiv.innerHTML = newValue
    //     innerBox[i].prepend(newDiv) 
    // }

  
    // apiData.data.forEach( el =>{
    //     innerBox.innerText +=
    //    `<h3>${el.attributes.name}</h3>
    //     <p>${el.attributes.description}</p>
    //     <p>${el.attributes.audio_text}</p>`
    
    //     console.log(innerBox)
    // }

//   // *******************************************************
//   async function fetchImpressions(){
//     const response = await fetch(impressionsURL)
//     const apiData = await response.json();
//     console.log("Here are the Impressions")
//     console.log(apiData)
//   }
//  // *******************************************************

//  // *******************************************************
// async function postImpression(event) {
//     const audioFile = event.target.querySelector("#audio_file").files[0]
//     const formData = new FormData(
//     formData.append('impression[user_id]', 1),
//     formData.append('impression[celebrity_id]', 1),
//     formData.append('impression[match_score]', 5),
//     formData.append('impression[audio]', audioFile))


//   const response = await fetch(impressionsURL, {
//       method: 'POST',
//       body: formData
//   })
//   const apiData = await response.json();
//   debugger

// //   let newAudio = document.createElement("audio"); 
// //   newAudio.src = '';
// //   document.append(newAudio);
// //   audioFile.play()

//           const audioSample = audioFile
//           const audioBlob = new Blob([audioSample],{type: 'audio/mp3'});
//           const audioUrl = URL.createObjectURL(audioBlob);
//           const audio = new Audio(audioUrl);
//           //   audio.play()
//           const listenButton = document.querySelector("#button")
//           listenButton.addEventListener("click",() => {
//               audio.play()
//           })
// 
