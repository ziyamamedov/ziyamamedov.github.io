const HAM_BTN = document.querySelector('#hamburgerBtn');
const hamMenu = document.querySelector('#mainNav');
const closeBtn = document.querySelector('#hamCloseBtn');




HAM_BTN.addEventListener('click', function(e) {
  e.preventDefault();
  hamMenu.classList.add('nav--active');
  this.style.display = 'none';
} );

closeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  hamMenu.classList.remove('nav--active');
  HAM_BTN.style.display = '';
});

hamMenu.addEventListener('click', function() {
  hamMenu.classList.remove('nav--active');
  HAM_BTN.style.display = '';
});

