export class Player {
  constructor(element) {
    this.element = element;
    this.isJumping = false;
    this.isColliding = false;
    this.jumpHeight = 150;
    this.jumpSpeed = 5;
    this.gravity = 5;
    this.doubleJumpAvailable = false;
    this.elementPosition = 0;
    this.jumpCount = 0;
    this.element.style.bottom = this.elementPosition + "px";
  }

  stop() {
    this.isColliding = true;
  }

  jump(jumpSound) {
    if (!this.isColliding) {
      if (!this.isJumping) {
        jumpSound();
        return this.startJump();
      } else if (this.jumpCount === 1 && this.doubleJumpAvailable) {
        jumpSound();
        return this.doubleJump();
      }
    }
  }

  startJump() {
    this.isJumping = true;
    this.jumpCount = 1;
    this.doubleJumpAvailable = true;
    this.elementPosition = 0;
    this.element.style.bottom = this.elementPosition + "px";

    let jumpIntervalID = setInterval(() => {
      if (this.elementPosition < this.jumpHeight) {
        this.elementPosition += this.jumpSpeed;
        this.element.style.bottom = this.elementPosition + "px";
      } else {
        clearInterval(jumpIntervalID);
        this.applyGravity();
      }
    }, 10);
  }

  doubleJump() {
    this.doubleJumpAvailable = false;
    this.jumpCount = 2;

    let doubleJumpIntervalID = setInterval(() => {
      if (this.elementPosition < this.jumpHeight * 2) {
        this.elementPosition += this.jumpSpeed;
        this.element.style.bottom = this.elementPosition + "px";
      } else {
        clearInterval(doubleJumpIntervalID);
        this.applyGravity();
      }
    }, 10);
  }

  applyGravity() {
    let gravityIntervalID = setInterval(() => {
      if (this.elementPosition > 0 && !this.isColliding) {
        this.elementPosition -= this.gravity;
        this.element.style.bottom = this.elementPosition + "px";
      } else {
        clearInterval(gravityIntervalID);
        this.isJumping = false;
        this.doubleJumpAvailable = false;
      }
    }, 20);
  }
}

export function createPlayer() {
  const playerElement = document.createElement("div");
  playerElement.setAttribute("id", "player");
  gameField.appendChild(playerElement);
  return new Player(playerElement);
}
