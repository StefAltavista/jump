export class Player {
  constructor(element) {
    if (!element) {
      throw new Error('Player element must be provided');
    }

    this.player = element;
    this.isJumping = false;
    this.jumpHeight = 150;
    this.jumpSpeed = 10;
    this.gravity = 5;
    this.doubleJumpAvailable = false;
    this.playerPosition = 0;
    this.jumpCount = 0;

    // Set initial position
    this.player.style.bottom = this.playerPosition + "px";

    // Bind methods to correct 'this' context
    this.jump = this.jump.bind(this); // Переименуйте сюда
    this.applyGravity = this.applyGravity.bind(this);

    document.addEventListener("keydown", this.jump); // Используйте jump, а не handleKeyDown
  }

  jump(event) {
    if (event.code === "Space") {
      if (!this.isJumping) {
        this.startJump();
      } else if (this.jumpCount === 1 && this.doubleJumpAvailable) {
        this.doubleJump();
      }
    }
  }

  startJump() {
    this.isJumping = true;
    this.jumpCount = 1;
    this.doubleJumpAvailable = true;
    this.playerPosition = 0; // Reset to starting position
    this.player.style.bottom = this.playerPosition + "px"; // Apply the starting position

    let jumpInterval = setInterval(() => {
      if (this.playerPosition < this.jumpHeight) {
        this.playerPosition += this.jumpSpeed;
        this.player.style.bottom = this.playerPosition + "px"; // Update position
      } else {
        clearInterval(jumpInterval);
        this.applyGravity(); // Start gravity when jump is done
      }
    }, 20);
  }

  doubleJump() {
    this.doubleJumpAvailable = false;
    this.jumpCount = 2;
    let doubleJumpInterval = setInterval(() => {
      if (this.playerPosition < this.jumpHeight * 2) {
        this.playerPosition += this.jumpSpeed;
        this.player.style.bottom = this.playerPosition + "px"; // Update position
      } else {
        clearInterval(doubleJumpInterval);
        this.applyGravity();
      }
    }, 20);
  }

  applyGravity() {
    let gravityInterval = setInterval(() => {
      if (this.playerPosition > 0) {
        this.playerPosition -= this.gravity;
        this.player.style.bottom = this.playerPosition + "px"; // Update position
      } else {
        clearInterval(gravityInterval);
        this.isJumping = false; // Jump finished
        this.doubleJumpAvailable = false; // Reset double jump
      }
    }, 20);
  }
}
