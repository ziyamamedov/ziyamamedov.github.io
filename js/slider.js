function Slider(selector) {
  this.target = document.querySelector(selector);
  this.buttons = this.target.querySelectorAll('[data-vector]');
  var list = this.target.querySelector('ul');
  this.countSlides = list.children.length;
  this.currentSlideIndex = 0;
  list.style.transform = `translateX(-100%)`;


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
  this.changeSlide = function(index, button) {
    list.style.transform = `translateX(${-(index * 100) - 100}%)`;
    console.log(index);
    if(this.currentSlideIndex == this.countSlides) {
      setTimeout(() => {
        
        list.style.transition = 'none';
        this.currentSlideIndex = 0;
        list.style.transform = `translateX(-100%)`;
        
        setTimeout(() => {
          (list.style.transition = '')
        }, 30);
        
      }, 500);
    } else if(this.currentSlideIndex == -1) {
      setTimeout(() => {
        list.style.transition = 'none';
        
        this.currentSlideIndex = this.countSlides - 1;
        list.style.transform = `translateX(${-(this.countSlides * 100)}%)`;
        
        setTimeout(() => {
          (list.style.transition = '')
        }, 30);
        
      }, 500);
    }
  }


  addElems();

  for(let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].addEventListener('click', (e) => {
      
      e.preventDefault();

      var vector = this.buttons[i].dataset.vector;
      this[vector](); // Вызывается ф-я next или previous в зависимости от нажатой кнопки
      
      this.changeSlide(this.currentSlideIndex, this.buttons[i]);

      console.log(e);

    });
  }
  


}


var barsSlider = new Slider('#bars');