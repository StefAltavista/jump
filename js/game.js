import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { User } from "./user.js";

const welcomeModal = document.getElementById("welcome");
const startButton = document.getElementById("start");
const userDataModal = document.getElementById("userData");
const submitDataButton = document.getElementById("submitData");
const userDataInput = document.querySelector(".userDataInput");
const displayUserName = document.getElementById("displayUserName");
console.log(displayUserName);
const muteButton = document.getElementById("soundMute");
const sounds = new Sounds(muteButton);
const modal = new Modal();



let mute = true;

muteButton.addEventListener("click", () => {
  sounds.toggleMute();
});

startButton.addEventListener("click", () => {
  welcomeModal.classList.add("hide");
  userDataModal.classList.remove("hide");
});

submitDataButton.addEventListener("click", () => {
  let name = userDataInput.value;
  if (!name) {
    console.log("error: Name is empty");
    return;
  }
  name = name.trim();

  if (!/^[a-zA-Z0-9\s]+$/.test(name) || name.length < 3 || name.length > 20) {
    console.log("error: Invalid name");
    return;
  }

  const uid = `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const user = new User(uid, name);
  localStorage.setItem(user.uid, JSON.stringify(user));
  displayUserName.innerText = user.name;
  userDataModal.classList.add("hide");
  startGame(sounds);
});
