import { createModal } from "./modals.js";

export function timer(sounds) {
  const timerModal = createModal(
    `<div id="timer" class="modals">
  </div>`,
    true,
    false
  );
  return new Promise((resolve) => {
    let count = 3;
    const timerElement = document.getElementById("timer");
    const intervalID = setInterval(function () {
      if (count >= 1) {
        timerElement.innerHTML = `<h2> ${count} </h2>`;
        count--;
      } else if (count === 0) {
        count--;
        timerElement.innerHTML = `<h2> GO! </h2>`;
      } else {
        sounds.play("start");
        clearInterval(intervalID);
        timerModal.remove();
        resolve();
      }
    }, 1000);
  });
}
