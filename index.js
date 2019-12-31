// const impressionAudio = document.getElementById("newSong")
// const impressionsURL = "http://localhost:3000/impressions"
// const celebritiesURL = "http://localhost:3000/celebrities"
// const usersURL = "http://localhost:3000/users"
// const impressionBox = document.querySelector("body > main")
// const celebBox = document.getElementsByClassName("box")
// // *******************************************************
// document.addEventListener("DOMContentLoaded", ()=>{
//     // fetchCelebrities()
//     // fetchImpressions()
//     // fetchUsers(),
//     let button1 = document.getElementById("button")
//         button1.addEventListener("click", (event) => {
//             event.preventDefault()
//            fetchAudio()
//         }
//         )
// })

//  function fetchAudio(){
//      fetch("http://localhost:3000/celebrities")
//      .then(response => response.json())
//      .then(json => console.log(json))
//  }
// // //   impressionAudio.addEventListener("submit", (event) =>{
// // //     event.preventDefault()
// // //     postImpression(event)
// // //   })
// //   // *******************************************************
// //   async function fetchCelebrities(){
// //     const response = await fetch(celebritiesURL)
// //     const apiData = await response.json();
// //     console.log("Here are the Celebs")
// //     console.log(apiData)
// //     }
// //   async function fetchImpressions(){
// //     const response = await fetch(impressionsURL)
// //     const apiData = await response.json();
// //     console.log("Here are the Impressions")
// //     console.log(apiData)
// //   }
// //   async function fetchUsers(){
// //     const response = await fetch(usersURL)
// //     const apiData = await response.json();
// //     console.log("Here are the Users")
// //     console.log(apiData)
// //   }
// // // // *******************************************************
// // async function postImpression(event) {
// //   const response = await fetch(impressionsURL, {
// //       method: 'POST',
// //       body: JSON.stringify({
// //           audio_file: document.querySelector("#audio_file").value,
// //           user_id: 1,
// //           celebrity_id: 1
// //       }),
// //       headers: {
// //           'Content-Type': 'application/json',
// //           'accept': 'application/json'
// //       }
// //   })
// //   const apiData = await response.json();
// //   console.log(apiData)
// // }
// // // // *******************************************************
// //   )}
// // }

const impressionsURL = "http://localhost:3000/impressions"
const celebritiesURL = "http://localhost:3000/celebrities"
const usersURL = "http://localhost:3000/users"

// *******************************************************
document.addEventListener("DOMContentLoaded", ()=>{
    fetchCelebrities()
    fetchImpressions()
    fetchUsers()
    const impressionBox = document.querySelector("body > main")
    const celebBox = document.getElementsByClassName("box")
    const impressionAudio = document.getElementById("newSong")
    const button1 = document.getElementById("button")
    button1.addEventListener("click", () =>{
            audio.play()
          })
    impressionAudio.addEventListener("submit", (event) =>{
            event.preventDefault()
            postImpression(event)
          })
})
  // *******************************************************
  async function fetchCelebrities(){
    const response = await fetch(celebritiesURL)
    const apiData = await response.json();
    console.log("Here are the Celebs")
    console.log(apiData)
    const innerBox= Array.from(document.getElementsByClassName("innerBox"))
    for(let i = 0; i< innerBox.length; i++){
        let newDiv = document.createElement('div')
        let newValue = 
       `<h3>${apiData.data[i].attributes.name}</h3>
        <p>${apiData.data[i].attributes.description}</p>
        <p>${apiData.data[i].attributes.audio_text}</p>
        <button id="button"> Listen</button> >>>> <button id="button2">Record</button>`
        newDiv.innerHTML = newValue
        innerBox[i].appendChild(newDiv)
    }

    const picBox = Array.from(document.getElementsByClassName("box"))
    for(let i = 0; i< picBox.length; i++){
        let newDiv = document.createElement('div')
        let newValue = 
       `<a href="" class="celebImage"><img src="https://target.scene7.com/is/image/Target/GUEST_10348e87-6152-4bd0-b1fe-d96ea230800c?wid=488&hei=488&fmt=pjpeg" alt=""/></a>`
        newDiv.innerHTML = newValue
        innerBox[i].prepend(newDiv) 
    }

  
    // apiData.data.forEach( el =>{
    //     innerBox.innerText +=
    //    `<h3>${el.attributes.name}</h3>
    //     <p>${el.attributes.description}</p>
    //     <p>${el.attributes.audio_text}</p>`
    
    //     console.log(innerBox)
    // }
}
  // *******************************************************
  async function fetchImpressions(){
    const response = await fetch(impressionsURL)
    const apiData = await response.json();
    console.log("Here are the Impressions")
    console.log(apiData)
  }
 // *******************************************************
  async function fetchUsers(){
    const response = await fetch(usersURL)
    const apiData = await response.json();
    console.log("Here are the Users")
    console.log(apiData)
  }
 // *******************************************************
async function postImpression(event) {
    const audioFile = event.target.querySelector("#audio_file").files[0]
const formData = new FormData(
formData.append('impression[user_id]', 1),
formData.append('impression[celebrity_id]', 1),
formData.append('impression[match_score]', 5),
formData.append('impression[audio]', audioFile))


  const response = await fetch(impressionsURL, {
      method: 'POST',
      body: formData
  })
  const apiData = await response.json();
  debugger

//   let newAudio = document.createElement("audio"); 
//   newAudio.src = '';
//   document.append(newAudio);
//   audioFile.play()

          const audioSample = audioFile
          const audioBlob = new Blob([audioSample],{type: 'audio/mp3'});
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play()
}