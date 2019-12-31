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
    // button1.addEventListener("click", () =>{
    //         audioFile.play()
    //       })
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
    apiData.data.forEach( el =>{
        debugger
        const whatever = `
        <h3>${el.name}</h3>
        <p>${el.description}</p>
        <p>${el.audio_text}</p>
        `
        document.getElementsByClassName("innerBox").innerHTML += whatever

    }


    )
    }
  async function fetchImpressions(){
    const response = await fetch(impressionsURL)
    const apiData = await response.json();
    console.log("Here are the Impressions")
    console.log(apiData)
  }
  async function fetchUsers(){
    const response = await fetch(usersURL)
    const apiData = await response.json();
    console.log("Here are the Users")
    console.log(apiData)
  }
// // *******************************************************




async function postImpression(event) {
    const audioFile = event.target.querySelector("#audio_file").files[0]
    debugger
const formData = new FormData()
formData.append('impression[user_id]', 1)
formData.append('impression[celebrity_id]', 1)
formData.append('impression[match_score]', 5)
formData.append('impression[audio]', audioFile)


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