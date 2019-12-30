const impressionAudio = document.getElementById("newSong")
const impressionsURL = "http://localhost:3000/impressions"
const celebritiesURL = "http://localhost:3000/celebrities"
const usersURL = "http://localhost:3000/users"
const impressionBox = document.querySelector("body > main")
const celebBox = document.getElementsByClassName("box")

// *******************************************************
document.addEventListener("click", () =>{
    document.getElementById("myAudio").play()
  })
  document.addEventListener("DOMContentLoaded", ()=>{
    fetchCelebrities()
    fetchImpressions()
    fetchUsers()
  })
  impressionAudio.addEventListener("submit", (event) =>{
    event.preventDefault()
    postImpression(event)
  })
  // *******************************************************
  async function fetchCelebrities(){
    const response = await fetch(celebritiesURL)
    const apiData = await response.json();
    console.log("Here are the Celebs")
    console.log(apiData)
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
  const response = await fetch(impressionsURL, {
      method: 'POST',
      body: JSON.stringify({
          audio_file: document.querySelector("#audio_file").value,
          user_id: 1,
          celebrity_id: 1
      }),
      headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
      }
  })
  const apiData = await response.json();
  console.log(apiData)
}
// // *******************************************************
