export function checkCollision(player, obstacle) {
  let playerRect = player.element.getBoundingClientRect();
  let obstacleRect = obstacle.element.getBoundingClientRect();

  return (
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right &&
    playerRect.bottom > obstacleRect.top &&
    playerRect.top < obstacleRect.bottom
  );
}
