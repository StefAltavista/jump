import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { User } from "./user.js";

const welcomeModal = document.getElementById("welcome");
const enterGame = document.getElementById("enterGame");
const userDataModal = document.getElementById("userData");
const submitDataButton = document.getElementById("submitData");
const userDataInput = document.querySelector(".userDataInput");
const displayUserName = document.getElementById("displayUserName");
const muteButton = document.getElementById("soundMute");
const sounds = new Sounds(muteButton);
let user;

if (localStorage.getItem("current")) {
  user = localStorage.getItem("current");
  user = JSON.parse(user);
  displayUserName.innerText = user.name;
}

muteButton.addEventListener("click", () => {
  sounds.toggleMute();
});

enterGame.addEventListener("click", () => {
  welcomeModal.classList.add("hide");

  if (!user) {
    userDataModal.classList.remove("hide");
  } else startGame();
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

  const user = new User(name);
  user.save();
  localStorage.setItem("current", JSON.stringify(user));
  displayUserName.innerText = user.name;
  userDataModal.classList.add("hide");
  startGame(sounds);
});
