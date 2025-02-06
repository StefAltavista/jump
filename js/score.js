export class Score {
  constructor(scoreElement) {
    this.score = 0;
    this.scoreElement = scoreElement;
  }

  update() {
    this.score++;
    this.scoreElement.innerText = `Score: ${this.score}`;
  }
}
