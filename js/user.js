// const submitDataButton = document.getElementById("submitData");
// const userDataInput = document.querySelector(".userDataInput");

class User {
  constructor(name) {
    this.uid = this.generateID();
    this.name = name;
    this.scoreRecord = 0;
  }
  generateID = () => `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  save() {
    localStorage.setItem(this.uid, JSON.stringify(this));
  }
  load() {
    let userData = localStorage.getItem(this.uid);
    return userData ? JSON.parse(userData) : null;
  }
  checkNewRecord(score) {
    if (score > this.scoreRecord) {
      this.scoreRecord = score;
      return true;
    } else return false;
  }
}

export function current() {
  if (localStorage.getItem("current")) {
    let uid = localStorage.getItem("current");
    let user = JSON.parse(localStorage.getItem(uid));

    return user;
  } else return null;
}

export function signIn(submitDataButton, userDataInput) {
  console.log("sgning in");

  return new Promise(
    (resolve) => {
      submitDataButton.addEventListener("click", () => {
        let name = userDataInput.value;
        if (!name) {
          console.log("error: Name is empty");
        } else if (
          !/^[a-zA-Z0-9\s]+$/.test(name) ||
          name.length < 3 ||
          name.length > 20
        ) {
          console.log("error: Invalid name");
        } else {
          name = name.trim();
          const user = new User(name);
          user.save();
          localStorage.setItem("current", user.uid);
          displayUserName.innerText = user.name;
          resolve(user);
        }
      });
    },
    { once: true }
  );
}
