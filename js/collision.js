export function checkCollision(player, obstacles) {
  let playerRect = player.element.getBoundingClientRect();

  for (let obstacle of obstacles) {
    let obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.right > obstacleRect.left &&
      playerRect.left < obstacleRect.right &&
      playerRect.bottom > obstacleRect.top &&
      playerRect.top < obstacleRect.bottom
    ) {
      return true;
    }
  }
}
