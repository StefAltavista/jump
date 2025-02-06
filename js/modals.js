// Here we create a function for each modal we want to show (start/game over/...) and use renderModal function to show it with attribute as model function.

export class Modal {
  constructor(modalElement) {
    this.modalElement = modalElement;
    // this.modalElement.style.display = 'none';
  }

  createModalGameOver = ()=>`
    <div class="detail">
      <div class="detail__header">
          <h2 class="detail__title">GAME OVER</h2>
          <button class="modal__close">Press any button...</button>
      </div>
    </div>
`
  
  createModalStart = () => ``
  
  countdownModal = () => ``


  renderModal (modalFunction){
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalMain = document.createElement('div');
    modalMain.classList.add('modal__main');
    modalMain.innerHTML=modalFunction;
    modal.append(modalMain);
    document.body.append(modal);

    modal.addEventListener("click", ({target})=>{
      if (target===modal || target.closest(".modal__close")){
          modal.remove();
      }
  });
  };


  
}