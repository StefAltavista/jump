export class User {
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
