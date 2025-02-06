class Obstacle {
  constructor(element) {
    this.element = element;
    this.isStopping = false;
    this.element.id = "obstacle";
    this.element.style.width = `${Math.random() * 100 + 10}px`;
    this.element.style.height = `${Math.random() * 210 + 20}px`;
    this.element.style.background = `rgb( ${Math.random() * 255}, ${
      Math.random() * 255
    }, 
      ${Math.random() * 255})`;
  }

  move(speed) {
    this.element.style.animation = `obstacleMove ${speed}ms linear`;
    setTimeout(() => {
      if (!this.isStopping) {
        this.element.remove();
      }
    }, speed);
  }
  stop() {
    this.isStopping = true;
    this.element.style.animationPlayState = `paused`;
  }
}

export function createObstacle(gameField) {
  const obstacle = new Obstacle(document.createElement("div"));
  gameField.appendChild(obstacle.element);
  return obstacle;
}
