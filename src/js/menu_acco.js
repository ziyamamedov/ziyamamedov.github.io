function Accordeon (selector, activeClass) {
  
  this.target = document.querySelector(selector); //Элемент Аккордеона
  var elemCount = this.target.children.length; //Кол-во эл-тов в акк-не

  //Медиа-запросы
  var media = window.matchMedia('(max-width: 768px');
  var mediaPhones = window.matchMedia('(max-width: 480px');

  //Переключение Активного класса
  this.toggleClass = function (elem, content) {
    if(!elem.classList.contains(activeClass)) {
      elem.classList.add(activeClass); 
    } else {
      elem.classList.remove(activeClass);
      content.style.width = ''; //Ширина выпадашки приравнивается к исх. знач-ю(0)
    }
  }

  // Закрытие предыдущего открытого эл-та
  this.removeLastActive = function(activeElem) {
    if(activeElem) {
        if(activeElem == item) {
          activeElem = null;
        } else {
          activeElem.classList.remove(activeClass);
          activeElem.querySelector('.menu__item-content').style.width = '';
        }
      } 
  }

  //Ф-я устан-ет ширину выпадашки и текста в ней 
  function setWidth(elem, textElem, button) {
    var itemWidth;

    if (mediaPhones.matches) {
      itemWidth = `${document.documentElement.clientWidth - (parseInt((getComputedStyle(button).width)))}px`;
      elem.style.width = itemWidth;
      textElem.style.width = `${parseInt(itemWidth)}px`;
    } else if(media.matches) {
      itemWidth = `${document.documentElement.clientWidth - (parseInt((getComputedStyle(button).width)) * elemCount)}px`;
      elem.style.width = itemWidth;
      textElem.style.width = `${parseInt(itemWidth)}px`;
    } else {
      itemWidth = `453px`;
      elem.style.width = itemWidth;
      textElem.style.width = `${parseInt(itemWidth)}px`;
    }
  }

  //Переменные, используемые в фуекциях
  var item; //Элемент аккордеона(li)
  var activeItem; //Активный элемент
  var content; // Открывающийся элемент
  var text // Текст в откр-ся элементе

  this.accoFunction = function() {

    //Обработчик событий
    this.target.addEventListener('click', (e) => {

    var button = e.target.closest('[data-vector]');
    var pushContent = e.target.closest('.menu__item-content');
    
    if(button) {
        e.preventDefault();
        if(button.dataset.vector != 'cls-btn'){
          item = button.parentElement;
          HAM_BTN.style.display = 'none';//Убираем кнопку-гамбургер(глобальная переменнная из hamburger_menu.js)
        } else {HAM_BTN.style.display = ''}
        content = item.querySelector('.menu__item-content');
        text = item.querySelector('.menu__item-content-text');

        this.removeLastActive(activeItem);
        setWidth(content, text, button);
        this.toggleClass(item, content);
        activeItem = item;
        
      }

      //Нажатие на тело открывшегося элемента
      if(e.target == pushContent) {
        this.toggleClass(pushContent.parentElement, pushContent);
        HAM_BTN.style.display = '';
      } 
    });
  }

}//Конец конструкции Accordeon


var menuAcco = new Accordeon('#menuAcco', 'menu__item--active');

menuAcco.accoFunction();
