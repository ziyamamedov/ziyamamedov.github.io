const hamBtn = document.querySelector('#hamburgerBtn');
const hamMenu = document.querySelector('#mainNav');
const closeBtn = document.querySelector('#hamCloseBtn');




hamBtn.addEventListener('click', function(e) {
  e.preventDefault();
  hamMenu.classList.add('nav--active');
  this.style.display = 'none';
} );

closeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  hamMenu.classList.remove('nav--active');
  hamBtn.style.display = '';
});

hamMenu.addEventListener('click', function() {
  hamMenu.classList.remove('nav--active');
  hamBtn.style.display = '';
});

