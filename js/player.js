export class Player {
  constructor(element) {
    if (!element) {
      throw new Error("Player element must be provided");
    }

    this.element = element;
    this.isJumping = false;
    this.isColliding = false;
    this.jumpHeight = 150;
    this.jumpSpeed = 10;
    this.gravity = 5;
    this.doubleJumpAvailable = false;
    this.elementPosition = 0;
    this.jumpCount = 0;
    this.element.style.bottom = this.elementPosition + "px";
    this.jumpIntervalID;
    this.doubleJumpIntervalID;
    this.gravityIntervalID;
  }

  stop() {
    this.isColliding = true;
  }

  jump(jumpSound) {
    if (!this.isColliding) {
      if (!this.isJumping) {
        this.startJump();
        jumpSound();
      } else if (this.jumpCount === 1 && this.doubleJumpAvailable) {
        this.doubleJump();
        jumpSound();
      }
    }
  }

  startJump() {
    this.isJumping = true;
    this.jumpCount = 1;
    this.doubleJumpAvailable = true;
    this.elementPosition = 0;
    this.element.style.bottom = this.elementPosition + "px";

    this.jumpIntervalID = setInterval(() => {
      if (this.elementPosition < this.jumpHeight) {
        this.elementPosition += this.jumpSpeed;
        this.element.style.bottom = this.elementPosition + "px";
      } else {
        clearInterval(this.jumpIntervalID);
        this.applyGravity();
      }
    }, 10);
  }

  doubleJump() {
    this.doubleJumpAvailable = false;
    this.jumpCount = 2;

    this.doubleJumpIntervalID = setInterval(() => {
      if (this.elementPosition < this.jumpHeight * 2) {
        this.elementPosition += this.jumpSpeed;
        this.element.style.bottom = this.elementPosition + "px";
      } else {
        clearInterval(this.doubleJumpIntervalID);
        this.applyGravity();
      }
    }, 10);
  }

  applyGravity() {
    this.gravityIntervalID = setInterval(() => {
      if (this.elementPosition > 0 && !this.isColliding) {
        this.elementPosition -= this.gravity;
        this.element.style.bottom = this.elementPosition + "px";
      } else {
        clearInterval(this.gravityIntervalID);
        this.isJumping = false;
        this.doubleJumpAvailable = false;
      }
    }, 20);
  }
}
