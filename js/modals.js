const createModal = function (htmlString, actionRequired, deleteRequired) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalMain = document.createElement("div");
  modalMain.classList.add("modal__main");
  modalMain.innerHTML = htmlString;

  modal.append(modalMain);
  document.body.append(modal);

  if (actionRequired) {
    modalMain.classList.add("actionModal");
    modalMain.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
    });
  }

  if (deleteRequired) {
    modal.addEventListener("click", (e) => {
      e.preventDefault();
      modal.remove();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key) modal.remove();
    });
  }

  return modal;
};

const SignInModal = () =>
  createModal(
    `<div id="signInModal" class="modals modal_signIn">
      <h3>Enter your Name</h3>
      <input type="text" class="userDataInput" required/>
      <p id="note">Only letters are allowed<br/>between 3 and 20 characters</p>
      <button id="submitData">Start</button>
    </div>`,
    true,
    false
  );

const RestartModal = (gameStats) =>
  createModal(
    `<div class="modals noBackground">
        <h2 class="gameOver__title">Life Left: ${gameStats.lifes}</h2>
        <h3 class="gameOver__title">Current Score: ${gameStats.score}</h3>
        <button id="restart">Retry</button>
      </div>`,
    true,
    false
  );

const GameOverModal = (user, gameStats) =>
  createModal(
    `<div class="gameOver noBackground">
      <h2 class="gameOver__title">GAME OVER</h2>
      <p>Score: ${user.scoreRecord}</p>
      ${
        user.checkNewRecord(gameStats.score)
          ? "<h3>New Personal Record!</h3>"
          : ``
      }
      <button id="newGame">New game</button><button id="changeUser">Change User</button><button id="viewList">Veiw Record List</button>
    </div>`,
    true,
    true
  );
const RecordModal = () =>
  createModal(
    `<div class="recordsmodal modals"><h1>Jump Records</h1><div class="recordList"><ul>${list}</ul></div>
<button id="exit">Exit</button></div>`,
    true,
    false
  );
export { createModal, RestartModal, SignInModal, GameOverModal, RecordModal };
