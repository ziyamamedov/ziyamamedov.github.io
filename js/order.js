

const orderForm = document.querySelector('#orderForm');
submitBtn = orderForm.elements.submit;

// Обработчик событий на кнопку "Заказать"
submitBtn.addEventListener('click', function(event) {
  
  // Если форма не валидна, браузер будет выводить стандартные сообщения валидности
  // Если валидна, выполнится код ниже
  if(orderForm.checkValidity()){
    event.preventDefault();

    // Создании экземпляра объекта FormData
    const data = new FormData();
    data.append("name", orderForm.elements.username.value);
    data.append("phone", orderForm.elements.phone.value);
    data.append("comment", orderForm.elements.comment.value);
    data.append("to", "ziya_90@mail.ru");

    // Создание AJAX запроса
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail', true);
    xhr.responseType = 'json';
    xhr.send(data);

    // Создание экземпляра модального окна
    var modal = new Overlay('#overlayTemplate');

    // Высвечивание модального окна(окно ожидания ответа)
    modal.toggleClsButtonVisibility();
    modal.openOverlay("Ожитдайте ответа от сервера");

    // Обработчик события ответа от сервера
    xhr.addEventListener('load', () =>{
      modal.toggleClsButtonVisibility();
      
      // Смена текста в модальном окне
      modal.changeMessage(xhr.response.message);
    });
  }
});
