export class User {
  constructor(name, uid = this.generateID(), scoreRecord = 0) {
    this.uid = uid;
    this.name = name;
    this.scoreRecord = scoreRecord;
  }
  generateID = () => `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  updateScoreRecord(newRecord) {
    this.scoreRecord = newRecord;
  }
  save(user) {
    localStorage.setItem(user.uid, JSON.stringify(user));
  }
  static load(uid) {
    const userData = JSON.parse(localStorage.getItem(uid));
    if (!userData) return null;

    return new User(userData.name, uid, userData.scoreRecord);
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
          localStorage.setItem("current", user.uid);
          displayUserName.innerText = user.name;
          user.save(user);
          resolve(user);
        }
      });
    },
    { once: true }
  );
}
