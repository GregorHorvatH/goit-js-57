import { cars } from './cars.js';

let items = cars;
let basket = [];

const carTemplate = ({ make, model }) => `<li data-model="${model}">
  <span>${make} - ${model}</span>
  <button data-name="view">view</button>
  <button data-name="buy">buy</button>
  <button data-name="delete">x</button>
</li>`;

const instance = basicLightbox.create(`
<div class="modal">
  <p class="model"></p>
  <button>close</button>
</div>`);

const refs = {
  basketValue: document.querySelector('.basket-value'),
  carsList: document.querySelector('.cars-list'),
};

const renderBasket = () => {
  refs.basketValue.textContent = basket.length;

  console.log(basket);
};

const renderCars = () => {
  const list = items.map(carTemplate).join('');

  refs.carsList.innerHTML = '';
  refs.carsList.insertAdjacentHTML('beforeend', list);
};

const viewItem = (model) => {
  instance.element().querySelector('.model').textContent = model;
  instance.show();
};

const addToBasket = (model) => {
  basket.push({ model, count: 1 });
  renderBasket();
};

const deleteItem = (model) => {
  items = items.filter((item) => item.model !== model);
  renderCars();
};

const handleItemClick = (e) => {
  if (e.target === e.currentTarget) return;

  const parent = e.target.closest('li');
  const action = e.target.dataset.name; // view, buy, delete
  const model = parent.dataset.model;

  switch (action) {
    case 'view':
      viewItem(model);
      break;

    case 'buy':
      addToBasket(model);
      break;

    case 'delete':
      deleteItem(model);
      break;
  }
};

renderCars();

refs.carsList.addEventListener('click', handleItemClick);

instance
  .element()
  .querySelector('button')
  .addEventListener('click', instance.close);
