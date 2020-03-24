
//Ниже задется ширина обертки выпадашки (выпадашки записываются в массив dropBlock)
//Это сделано для анимирования выпадания 
var dropBlock = document.querySelectorAll('.accordeon__item-info');
var avatar = document.querySelectorAll('.accordeon__item-avatar');
var computedHeight = [];

var media = window.matchMedia('(max-width: 768px)');


for (let i = 0; i < dropBlock.length; i++) {

  if(media.matches) {
    dropBlock[i].insertBefore(avatar[i], dropBlock[i].firstChild);
    computedHeight.push(getComputedStyle(dropBlock[i]).height);
  } else {
    //Ширина обертки приравнивается к просчитанной браузером ширине выпадашки
    dropBlock[i].parentNode.style.height = getComputedStyle(dropBlock[i]).height;
  }

  //Ширина самой выпадашки приравнивается к 0 
  dropBlock[i].style.height = '0px';
}

// Функционал аккордеона
var buttons = document.querySelectorAll('.accordeon__item-title');

//Массив булеанов, определяющих, открыта ли выпадашка, по умолч-ю false
var isActive = [];
for (let i = 0; i < buttons.length; i++) {
  isActive.push(false);
}

//Цикл задающий каждой кнопке обработчик событий
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(event) { 
    if(!isActive[i]) {
      
      for(let x = 0; x < dropBlock.length; x++) {
        if(x != i && isActive[x]) {
          buttons[x].parentNode.classList.remove('accordeon__item--active');
          dropBlock[x].style.height = '0px';
          isActive[x] = false;
        }
      }
      this.parentNode.classList.add('accordeon__item--active');
      
      if(media.matches) {
        dropBlock[i].style.height = computedHeight[i];
      } else {
        dropBlock[i].style.height = '100%';
      }
      
      isActive[i] = true;
    } else {
      this.parentNode.classList.remove('accordeon__item--active');
      dropBlock[i].style.height = '0px';
      isActive[i] = false;
    }    
  });
}

//Код выполняющийся при ресайзе окна в реальном времени
media.addEventListener('change', function () {
  if(media.matches) {
    for(let i = 0; i < dropBlock.length; i++) {
      dropBlock[i].insertBefore(avatar[i], dropBlock[i].firstChild);
      dropBlock[i].parentNode.style.height = 'initial';
      dropBlock[i].style.height = 'initial';
      computedHeight[i] = getComputedStyle(dropBlock[i]).height;
      if(!isActive[i]) {
        dropBlock[i].style.height = '0px';
      }
    }
  } else {
    for(let i = 0; i < dropBlock.length; i++) {
      buttons[i].parentNode.insertBefore(avatar[i], buttons[i]);
      dropBlock[i].style.height = 'initial';
      dropBlock[i].parentNode.style.height = getComputedStyle(dropBlock[i]).height;
      if(!isActive[i]) {
        dropBlock[i].style.height = '0px';
      }
    } 
  } 
});