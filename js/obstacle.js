class Obstacle {
  constructor(element, size, minsize, time) {
    this.element = element;
    this.isStopping = false;
    this.element.id = "obstacle";
    this.width = Math.random() * size + minsize;
    this.element.style.width = `${this.width}px`;
    this.height = Math.random() * size + minsize;
    this.element.style.height = `${this.height}px`;
    this.borderRadius = Math.random() * size;
    this.element.style.borderRadius = `${this.borderRadius * size}px`;
    this.createColors();
  }

  createColors() {
    console.log("colors");
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let mainColor = `rgb(${r}, ${g}, ${b})`;
    let shadowColor = `rgb(${r - 50}, ${g - 50}, ${b - 50})`;
    this.element.style.background = mainColor;
    this.element.style.boxShadow = `inset 5px 5px 10px ${shadowColor}`;
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
  changeWidth(cicle) {
    this.element.style.width = `${this.width * (1 + 0.05 * Math.sin(cicle))}px`;
    this.element.style.height = `${
      this.height * (1 + 0.1 * Math.sin(cicle))
    }px`;
  }
}

export function createObstacle(gameField) {
  const obstacle = new Obstacle(document.createElement("div"), 100, 10);
  gameField.appendChild(obstacle.element);
  return obstacle;
}

export function createBoss(gameField) {
  const obstacle = new Obstacle(document.createElement("div"), 300, 100);
  gameField.appendChild(obstacle.element);
  return obstacle;
}
