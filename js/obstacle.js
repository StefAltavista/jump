export class Obstacle {
  constructor(element) {
    this.element = element;
  }

  move() {
    this.element.style.animation = "obstacleMove 2s infinite linear";
  }
}
