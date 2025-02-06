export class Player {
  constructor(element) {
    this.element = element;
    this.isJumping = false;
    this.isStopping = false;
  }

  jump(jump) {
    if (!this.isJumping) {
      this.isJumping = true;
      this.element.classList.add("jump");
      jump();

      setTimeout(() => {
        if (!this.isStopping) {
          this.element.classList.remove("jump");
          this.isJumping = false;
        }
      }, 1000);
    }
  }
  stop() {
    this.isStopping = true;
    this.element.style.animationPlayState = `paused`;
  }
}
