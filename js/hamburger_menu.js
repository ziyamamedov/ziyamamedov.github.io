const hamBtn = document.querySelector('#hamburgerBtn');
const hamMenu = document.querySelector('#mainNav');
const closeBtn = document.querySelector('#hamCloseBtn');




hamBtn.addEventListener('click', function() {
  hamMenu.classList.add('nav--active');
  
} );

closeBtn.addEventListener('click', function() {
  hamMenu.classList.remove('nav--active');
});

hamMenu.addEventListener('click', function() {
  hamMenu.classList.remove('nav--active');
});

