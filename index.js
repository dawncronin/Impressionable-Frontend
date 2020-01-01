

const impressionsURL = "http://localhost:3000/impressions"
const celebritiesURL = "http://localhost:3000/celebrities"
const usersURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", ()=>{
    fetchCelebrities()
    fetchCelebrity()
    fetchImpressions()
    fetchUsers()
    const impressionBox = document.querySelector("body > main")
    const celebBox = document.getElementsByClassName("box")
    const impressionAudio = document.getElementById("newSong")
    const button1 = document.getElementById("button")
    impressionAudio.addEventListener("submit", (event) =>{
            event.preventDefault()
            postImpression(event)
          })
})

  // async function fetchCelebrity(){
  //   const response = await fetch("http://localhost:3000/celebrities/1/audio")
  //   const apiData = await response.json();
  //   console.log(apiData.link)
  //   var audio = new Audio(apiData.link);
  //   // audio.src = apiData.link
  //   document.addEventListener("click", (event) => audio.play())
    // document.querySelector("body").innerHTML = `
    //   <div id="player">
    //   <audio src="${apiData.link}" controls></audio>
    //   <div id="mask"></div>
    //   </div>"
    // `

    // var blob = new Blob([response], { type: 'audio/mp3' });
    // var url = window.URL.createObjectURL(blob)
    // window.audio = new Audio();
    // window.audio.src = url;
    // console.log(url)


  }
  async function fetchCelebrities(){
    const response = await fetch(celebritiesURL)
    const apiData = await response.json();
    // console.log("Here are the Celebs")
    // console.log(apiData)
    var blob = new Blob([apiData.data[0].audio], { type: 'audio/mp3' });
    var url = window.URL.createObjectURL(blob)
    window.audio = new Audio();
    window.audio.src = url;
    console.log(url)

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
}
//   // *******************************************************
//   async function fetchImpressions(){
//     const response = await fetch(impressionsURL)
//     const apiData = await response.json();
//     console.log("Here are the Impressions")
//     console.log(apiData)
//   }
//  // *******************************************************
//   async function fetchUsers(){
//     const response = await fetch(usersURL)
//     const apiData = await response.json();
//     console.log("Here are the Users")
//     console.log(apiData)
//   }
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
// }
