function Overlay(templateSelector) {
  const template = document.querySelector(templateSelector);
  const overlay = createOverlay(template);
  const backGround = overlay.querySelector('.overlay');
  const msgContainer = overlay.querySelector('.modal__title');
  const closeBtn = overlay.querySelector('button');
  
  //создание модалки
  function createOverlay() {
    let overlay = document.createElement('div');
    overlay.innerHTML = template.innerHTML;
    return overlay;
  }

  //Появление модалки(добавление в DOM-дерево)
  this.openOverlay = (message) => {
    document.body.appendChild(overlay);
    msgContainer.textContent = message;
    document.body.style.overflow = 'hidden';
  }

  //Удаление модалки(из DOM-дерева)
  this.closeOverlay = () => {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
  }

  // Метод изменяет текст сообщения в модалке
  this.changeMessage = (newMessage) => {
    msgContainer.textContent = newMessage;
  }

  //Метод, кот-й использ-ся в обработчике событий на кнопку закрыть и внешнюю область модалки
  var eventHandler =  (e) => {
    e.preventDefault();
    if(e.target === closeBtn || e.target === backGround) {
      this.closeOverlay();
    }
  }

  var isCloseBtnVisible = true;
  //Переключение видимости кнопки закрыть, и возможности нажать на внешнюю рамку
  this.toggleClsButtonVisibility = () => {
    
    if(isCloseBtnVisible) {
      closeBtn.style.display = 'none';
      isCloseBtnVisible = false;
      overlay.removeEventListener('click', eventHandler);
    } else {
      closeBtn.style.display = '';
      isCloseBtnVisible = true;
      overlay.addEventListener('click', eventHandler);
    }
  }

  overlay.addEventListener('click', eventHandler);

}// Конец конструкции Overlay




