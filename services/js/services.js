const homeBtn = document.querySelector('#home-btn');
const menuContainer = document.querySelector('.menu-container');
const newServiceItem = document.querySelector('.new-service-item');
const img = document.querySelector('img')

homeBtn.addEventListener('click', function (event) {
  menuContainer.classList.toggle('visible');
});

