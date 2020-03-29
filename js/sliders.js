function Slider(selector) {
  this.target = document.querySelector(selector);
  this.buttons = this.target.querySelectorAll('[data-vector]');
  var list = this.target.querySelector('ul');
  this.countSlides = list.children.length;
  this.currentSlideIndex = 0;
  list.style.transform = `translateX(-100%)`;

  //Добавляет копии первого в конец, и последнего в начало слайдера
  //Сделано для бесконечной прокрутки
  function addElems() {
    var newElemAfterLast = document.createElement('li');
    var newElemBeforeFirst = document.createElement('li');

    newElemAfterLast.classList = list.firstElementChild.classList;
    newElemBeforeFirst.classList = list.lastElementChild.classList;

    newElemAfterLast.innerHTML = list.firstElementChild.innerHTML;
    newElemBeforeFirst.innerHTML = list.lastElementChild.innerHTML;

    list.appendChild(newElemAfterLast);
    list.insertBefore(newElemBeforeFirst, list.firstElementChild);
  } 
  
  //Переключение на следующий слайд
  this.next = function() {
    if(this.currentSlideIndex <= this.countSlides-1) {
        this.currentSlideIndex++;
    }  
  }
  //Переключ-е на предыдущий слайд
  this.previous = function() {
    if(this.currentSlideIndex >= 0){
      this.currentSlideIndex--;
    }  
  } 

  // Переключение слайдера
  this.changeSlide = function(index, timeout) {
    list.style.transform = `translateX(${-(index * 100) - 100}%)`;
    if(this.currentSlideIndex == this.countSlides) {
      this.currentSlideIndex = 0;
      setTimeout(() => {
        list.style.transition = 'none';
        
        list.style.transform = `translateX(-100%)`;
        
        setTimeout(() => {
          (list.style.transition = '')
        }, 30);
        
      }, timeout);
    } else if(this.currentSlideIndex == -1) {
      this.currentSlideIndex = this.countSlides - 1;
      setTimeout(() => {
        list.style.transition = 'none';
        list.style.transform = `translateX(${-(this.countSlides * 100)}%)`;
        setTimeout(() => {
          (list.style.transition = '')
        }, 30);
        
      }, timeout);
    }
  }

  addElems();

  this.addListenersForArrows = () =>  {
    for(let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', (e) => {
        
        e.preventDefault();

        var vector = this.buttons[i].dataset.vector;
        this[vector](); // Вызывается ф-я next или previous в зависимости от нажатой кнопки
        
        this.changeSlide(this.currentSlideIndex, 500);

      });
    }
  }
} // Конец конструкции Slider

// Слайдер секции батончики
var barsSlider = new Slider('#bars');

barsSlider.addListenersForArrows();




// Слайдер секции отзывы
var reviewsSlider = new Slider('#reviewsSlider');

var clickTarget;
var activeButton = reviewsSlider.target.querySelector('.reviews__pagination-button--active');

var timerId = setInterval(function(){
  
  activeButton.classList.remove('reviews__pagination-button--active');
  
  reviewsSlider.next();

  reviewsSlider.changeSlide(reviewsSlider.currentSlideIndex, 1000);
  

  if(reviewsSlider.currentSlideIndex >= 0 && reviewsSlider.currentSlideIndex < reviewsSlider.countSlides) {
    reviewsSlider.buttons[reviewsSlider.currentSlideIndex].classList.add('reviews__pagination-button--active');

  activeButton = reviewsSlider.buttons[reviewsSlider.currentSlideIndex];
  }

} ,5000)

reviewsSlider.target.addEventListener('click', function (e) {

  e.preventDefault();
  
  clearInterval(timerId);

  if(e.target.closest('[data-vector]')) {

    clickTarget = e.target.closest('[data-vector]');

    if(!clickTarget.classList.contains('reviews__pagination-button--active')) {

      activeButton.classList.remove('reviews__pagination-button--active');
      clickTarget.classList.add('reviews__pagination-button--active');
      reviewsSlider.changeSlide(clickTarget.dataset.vector-1, 1000);
      activeButton = clickTarget;

    }
  } 
});