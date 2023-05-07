const basicBtn = document.getElementById('basic-btn');
const standardBtn = document.getElementById('standard-btn');
const premiumBtn = document.getElementById('premium-btn');
const typeContainer = document.querySelector('.type-container');
const priceContainer = document.querySelector('.price-container');

basicBtn.addEventListener('click', function () {
  typeContainer.querySelector('p').textContent = 'Basic';
  priceContainer.querySelector('p').textContent = 'PHP 150';
  basicBtn.classList.add('box-shadow');
  standardBtn.classList.remove('box-shadow');
  premiumBtn.classList.remove('box-shadow');
});

standardBtn.addEventListener('click', function () {
  typeContainer.querySelector('p').textContent = 'Standard';
  priceContainer.querySelector('p').textContent = 'PHP 250';
  basicBtn.classList.remove('box-shadow');
  standardBtn.classList.add('box-shadow');
  premiumBtn.classList.remove('box-shadow');
});

premiumBtn.addEventListener('click', function () {
  typeContainer.querySelector('p').textContent = 'Premium';
  priceContainer.querySelector('p').textContent = 'PHP 500';
  basicBtn.classList.remove('box-shadow');
  standardBtn.classList.remove('box-shadow');
  premiumBtn.classList.add('box-shadow');
});