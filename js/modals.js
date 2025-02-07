const createModal = function (htmlString, actionRequired) {
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

  modal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.remove();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key) modal.remove();
  });

  return modal;
};

export { createModal };
