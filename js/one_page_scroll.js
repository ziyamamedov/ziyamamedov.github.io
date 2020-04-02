function SliderJq(selector){

  this.container = $(selector); //Родитель слайдов
  this.slides = this.container.children(); //Объект со слайдами
  var viewport = $(window); //Объект окна
  this.slidesCount = this.slides.length;//Кол-во слайдов
  var slideHeight = this.slides.outerHeight();//Высота слайда
  this.slideIndex = this.slides.first().index();//Номер слайда, от 0
  
  var isScrollDown; // 

  //Переменные связанные с пагинацией
  var pagList,
      pagItems,
      activePagItem,
      pagButton,
      activePagClass;
  //Ф-я добавления пагинации(опционально)
  this.addPagination = (selector, item, activeClass) => {
    pagList = $(selector);
    activePagClass = activeClass;

    this.slides.each((ndx) => {
      let clone = item.clone();
      clone.find('a').attr('data-vector', `${ndx}`);
      clone.appendTo(pagList);
    })

    pagItems = pagList.children();
    activePagItem = pagItems.eq(this.slideIndex);
    activePagItem.addClass(activePagClass);
    
    pagList.on('click', '[data-vector]', (e) => {
      e.preventDefault();
      pagButton = $(e.target);
      this.slideIndex = pagButton.attr('data-vector');
      this.changeSlide(this.slideIndex);

      activePagItem.removeClass(activePagClass);
      activePagItem = pagButton.parent();
      activePagItem.addClass(activePagClass);

    });
  }      

  // Ограничение кол-ва вызовов переданной ф-ии
  var isDelayOn;
  function debounce(foo, time){
    if(isDelayOn) {
      //do nothing
    } else {
      isDelayOn = true;
      window.setTimeout(()=>{
        isDelayOn = false;
      }, time);
      foo();
    }
  }



  //Смена индекса слайда
  this.changeIndex = (isNext, index) => {
    if(isNext && index < this.slidesCount -1) {
      index++;
    } else if(!isNext && index > 0){
      index--;
    }
    return index;
  }

  //Смена слайда по индексу
  this.changeSlide = (index) => {
    $('html, body').stop(true, false).animate({
      'scrollTop' : (index * slideHeight)
    }, 300);

    //Если добавлена пагинация
    if(pagList) {
      activePagItem.removeClass(activePagClass);
      activePagItem = pagItems.eq(index);
      activePagItem.addClass(activePagClass);
    }
  }

  this.wheelResponse = (isDown) => {
    if(isDown) {
      isScrollDown = true;
      this.slideIndex = this.changeIndex(isScrollDown, this.slideIndex);
      this.changeSlide(this.slideIndex);
    } else {
      isScrollDown = false;
      this.slideIndex = this.changeIndex(isScrollDown, this.slideIndex);
      this.changeSlide(this.slideIndex);
    }
  }

  //Обраб-к соб-й на прокрутку мыши 
  viewport.on('wheel', (event) => {

    var isDown = event.originalEvent.deltaY > 0 ? true : false;
    debounce( () => { this.wheelResponse(isDown) }, 300);
  })

  //Обраб-к соб-й на свайп
  var ts;
  viewport.on('touchstart', (e) => {
      ts = e.originalEvent.touches[0].clientY;
  });

  viewport.on('touchmove', (e) => {
    var te = e.originalEvent.changedTouches[0].clientY;
    var isDown;
    if (ts > te) {
        isDown = true;
    } else {
        isdown = false;
    }
    debounce( () => { this.wheelResponse(isDown) }, 300);
  });

}//End of SliderJq

var scroll = new SliderJq('#mainContent');

var paginItem = $('<li>', {
  attr : {'class' : 'pagination__item'}
});
paginItem.html('<a href="" class="pagination__link"></a>');

scroll.addPagination('#mainPagination', paginItem, 'pagination__item--active');

// Обработчик событий на меню
$('body').on('click', '[href*="#"]', (e) => {
  e.preventDefault();
  let item = $(e.target.hash);
  
  scroll.slideIndex = item.index();
  scroll.changeSlide(scroll.slideIndex);
});