const homeBtn = document.querySelector('#home-btn');
const menuContainer = document.querySelector('.menu-container');
const blurContainer = document.querySelector('.blur-container');

homeBtn.addEventListener('click', function (event) {
  menuContainer.classList.toggle('visible');
  blurContainer.classList.toggle('blur');
});

