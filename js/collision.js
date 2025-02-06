let buffer = 0;
export function checkCollision(player, obstacles) {
  let playerRect = player.element.getBoundingClientRect();
  for (let obstacle of obstacles) {
    let obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.right > obstacleRect.left + buffer &&
      playerRect.left < obstacleRect.right - buffer &&
      playerRect.bottom > obstacleRect.top + buffer &&
      playerRect.top < obstacleRect.bottom - buffer
    ) {
      return true;
    }
  }
}
