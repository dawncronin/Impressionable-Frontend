

const impressionsURL = "http://localhost:3000/impressions"
const celebritiesURL = "http://localhost:3000/celebrities"
const usersURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", ()=>{
    fetchCelebrities()
    let currentUser = waitForLogin()
    // fetchImpressions()
    // fetchUsers()
    // const impressionBox = document.querySelector("body > main")
    // const celebBox = document.getElementsByClassName("box")
    // const impressionAudio = document.getElementById("newSong")
    // const button1 = document.getElementById("button")
    // impressionAudio.addEventListener("submit", (event) =>{
    //         event.preventDefault()
    //         postImpression(event)
    //       })
})

async function waitForLogin() {
    let res = await fetch(usersURL)
    let users = await res.json()
    users = users.data

    document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault()
    let value = event.target.username.value
    let exsistingUser = users.find(user => user.attributes.username == value)
    if (exsistingUser == undefined) {
        fetch(usersURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accpet':'application/json'},
              body: JSON.stringify({username: value})})
      .then(res => res.json())
      .then(json => {
        return await json})
    //post request to new user here
    //return new user
    }
    else {
      return exsistingUser
    }
  })

}

  async function fetchCelebrities(){
    const response = await fetch(celebritiesURL)
    const apiData = await response.json();
    console.log(apiData)
    apiData.data.forEach(celeb => {
      let celebName = document.createElement("div")
      celebName.setAttribute("id", celeb.attributes.name.split("")[0])
      celebName.innerHTML = `
      <p> ${celeb.attributes.name} </p>
      `
      document.querySelector("#chooseCeleb").appendChild(celebName)
      // celebName.addEventListener("Click", (event) => displayCeleb(event))

      addCelebrity(celeb)
    })
  }
      

  async function addCelebrity(celeb) {
    let newCeleb = document.createElement("div")
      newCeleb.setAttribute("id", celeb.attributes.id)
      newCeleb.setAttribute("class", "box")
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
      newImpression.setAttribute("id", `newImpression${celeb.attributes.id}`)  
      newImpression.innerHTML = `
      <p> Add your impression below: </p>
      <input type="file" accept="audio/*" capture>
      `

      newCeleb.appendChild(newImpression)
      // newImpression.addEventListener("change", (event) => postImpression(event))
  }





  

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
