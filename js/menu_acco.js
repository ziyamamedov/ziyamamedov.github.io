function Accordeon (selector, activeClass) {
  this.target = document.querySelector(selector);
  this.elements = this.target.children;
  this.elemCount = this.elements.length;
  this.buttons = this.target.querySelectorAll('[data-vector]');
  this.itemContent = this.target.querySelectorAll('.menu__item-content');
  this.textContent = this.target.querySelectorAll('.menu__item-content-text');
  this.closeBtn = this.target.querySelectorAll('.close-btn');


  var media = window.matchMedia('(max-width: 768px');
  var mediaPhones = window.matchMedia('(max-width: 480px');


  this.removeClass = function (elem, classToRemove) {
    elem.classList.remove(classToRemove);
  }

  this.removeOther = function(elem) {
    for(let i = 0; i < this.elemCount; i++) {
      if(this.elements[i] != elem) {
        this.elements[i].classList.remove(activeClass);
        if(media.matches) {
          this.itemContent[i].style.width = '';
          this.closeBtn[i].style.display = 'none';
        }
      }
    }
  }

  this.readComputedSize = function(elem, styleToRead) {
    var compStyle;

    if(styleToRead == 'width') {
      elem.style.width = 'auto';
      compStyle = getComputedStyle(elem).width;
      elem.style.width = '';
    } else if (styleToRead == 'height') {
      elem.style.width = 'auto';
      compStyle = getComputedStyle(elem).height;
      elem.style.width = '';
    }
    return compStyle;
  }
  
  var itemWidthMobile;

  // Начальная настройка ширины всплывающего окна
  if (mediaPhones.matches) {
    itemWidthMobile = `${document.documentElement.clientWidth - (parseInt((getComputedStyle(this.buttons[0]).width)))}px`;
  } else if(media.matches) {
    itemWidthMobile = `${document.documentElement.clientWidth - (parseInt((getComputedStyle(this.buttons[0]).width)) * this.buttons.length)}px`;
  } 

  console.log(itemWidthMobile);

  //Певоначальная настройка стилей
  for(let i = 0; i < this.elemCount; i ++) {

    this.elements[i].classList.add(activeClass);
    if(media.matches) {
      this.textContent[i].style.width = `${parseInt(itemWidthMobile) - 15}px`;
    } else {
      this.textContent[i].style.width = this.readComputedSize(this.textContent[i], 'width');
    }
    this.elements[i].classList.remove(activeClass);
    this.itemContent[i].style.transition = 'width 1s';
  }

  //Обработчик событий для заголовков
  for(let i = 0; i < this.elemCount; i++) {
    this.buttons[i].addEventListener('click', (e) => {
      
      e.preventDefault();

      if(!this.elements[i].classList.contains(activeClass)) {
        this.elements[i].classList.add(activeClass);
        if(media.matches) {
          this.itemContent[i].style.width = itemWidthMobile;
          this.closeBtn[i].style.display = '';
        }
      } else {
        this.elements[i].classList.remove(activeClass);
        this.itemContent[i].style.width = '';
      }

      this.removeOther(this.elements[i]);
    });
  }

  //Обработчик кликов для кнопки закрыть
  if(media.matches) {
    for(let i = 0; i < this.closeBtn.length; i++) {
      this.closeBtn[i].addEventListener('click', (e) => {
        this.elements[i].classList.remove(activeClass);
        this.itemContent[i].style.width = '';
        this.closeBtn[i].style.display = 'none';
      });
    }
  }
  

}//Конец конструкции Accordeon


var menuAcco = new Accordeon('#menuAcco', 'menu__item--active');

