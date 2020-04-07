//Создание объекта с элементами аккордеона
var accoItems = {
  self: document.querySelectorAll('.accordeon__item'),
  avatar: document.querySelectorAll('.accordeon__item-avatar'),
  button: document.querySelectorAll('.accordeon__item-title'),
  drop: document.querySelectorAll('.accordeon__item-info'),
  computedHeight: []
};


var media = window.matchMedia('(max-width: 768px)');
var avatarComputedHeight = [];

window.onload = function (){
  for(let i = 0; i < accoItems.self.length; i++) {
    //Считываение высоты выпадашки и присвеивание высоты обертке выпадашки для анимации
    accoItems.drop[i].style.height = 'auto'; //Разворачивание выпадашки для считывания высоты
    accoItems.computedHeight.push(getComputedStyle(accoItems.drop[i]).height); //считывание высоты выпадашки
    accoItems.drop[i].parentNode.style.height = accoItems.computedHeight[i]; //присвоение высоты выпадашки ее обертаке
    accoItems.drop[i].style.height = ''; //Сворачивание выпадашки

    //Считывание высоты аватарки, для анимации(для мобильных)
    accoItems.avatar[i].style.height = 'auto'; //разворач-е автарки для считывания высоты(для мобильных) 
    avatarComputedHeight.push(getComputedStyle(accoItems.avatar[i]).height);//считывание высоты аватарки
    accoItems.avatar[i].style.height = '';//сворачивание аватарки

    //для мобильных, обертка выпадашки не имеет жесткой высоты
    if(media.matches) {
      accoItems.drop[i].parentNode.style.height = '';
    }
  }
}

//Добавл-е обработчика событий на кнопки
for (let i = 0; i < accoItems.self.length; i++) {
  accoItems.button[i].addEventListener('click', function () {
    
    //Удал-е активного класса у не выбранных эл-тов
    for(let x = 0; x < accoItems.self.length; x++) {
      if(x != i && accoItems.self[x].classList.contains('accordeon__item--active')) {
        accoItems.self[x].classList.remove('accordeon__item--active');
        if(media.matches) {
          accoItems.drop[x].style.height = '';
          accoItems.avatar[x].style.height = '';
        }
      }
    }

    //Добавл-е и удал-е активного класса при нажатии кнопки
    if(accoItems.self[i].classList.contains('accordeon__item--active')) {
      accoItems.self[i].classList.remove('accordeon__item--active');
      
      //Высота выпадашки и высота аватарки устан-ся по умолч-ю(0px)(для моб. устройств)
      if(media.matches) {
        accoItems.drop[i].style.height = '';
        accoItems.avatar[i].style.height = '';
      }

    } else {
      accoItems.self[i].classList.add('accordeon__item--active');

      //Высота выпадашки и высота аватарки устан-ся на считынные ранее велечины
      if(media.matches) {
        accoItems.drop[i].style.height = accoItems.computedHeight[i];
        accoItems.avatar[i].style.height = avatarComputedHeight[i];
      }

    }
  });
}


//Код для изменения размера окна в реальном времени, чтобы верстка не ломалась
media.addEventListener('change', function() {
  if(media.matches) {
    for(let i = 0; i < accoItems.self.length; i++) {
      accoItems.drop[i].parentNode.style.height = '';
    }
  } else {
    for(let i = 0; i < accoItems.self.length; i++) {
      accoItems.drop[i].parentNode.style.height = accoItems.computedHeight[i];
    }
  }
});

