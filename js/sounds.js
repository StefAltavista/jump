export class Sounds {
  constructor() {
    this.sounds = {
      start: new Audio("../sounds/start.mp3"),
      jump: new Audio("../sounds/jump.mp3"),
      lost: new Audio("../sounds/collision.mp3"),
      boss: new Audio("../sounds/boss.mp3"),
      gameover: new Audio("../sounds/gameover.mp3"),
    };

    this.isMuted = false;
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    for (let sound in this.sounds) {
      this.sounds[sound].muted = this.isMuted;
    }
  }
}
