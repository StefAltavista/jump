export class Player {
  constructor(element) {
    this.element = element;
    this.isJumping = false;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.element.classList.add("jump");

      setTimeout(() => {
        this.isJumping = false;
        this.element.classList.remove("jump");
      }, 700);
    }
  }
}
