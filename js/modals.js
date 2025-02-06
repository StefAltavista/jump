// Here we create a function for each modal we want to show (start/game over/...) and use renderModal function to show it with attribute as model function.

export class Modal {
  constructor(modalElement) {
    this.modalElement = modalElement;
    // this.modalElement.style.display = 'none';
  }

  createModalGameOver = ()=>`
    <div class="gameOver">
          <h2 class="gameOver__title">GAME OVER</h2>
          <button class="gameOver__close">Press any key...</button>
    </div>
`
  
  createModalStart = () => ``
  
  countdownModal = () => ``


  renderModal (modalFunction){
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalMain = document.createElement('div');
    modalMain.classList.add('modal__main');
    modalMain.innerHTML=modalFunction();
    modal.append(modalMain);
    document.body.append(modal);

    modal.addEventListener("click", ()=>{modal.remove()});
    document.addEventListener("keydown", (event) => {if (event.key) modal.remove()});
  };


    
  

  
}