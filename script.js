const cart = document.querySelector('.cart__items'); // carrinho de compras
const cartSpan = document.querySelector('.total-price');

// pega os produtos do carrinho => separa (split) a descrição por espaços => pega o último elemento (.length-1) => retorna array com os valores e '$' => retira o '$'(replace)=> transforma em número (parseFloat) => soma!
const totalSum = () => { // soma os valores do carrinho
  const products = [...cart.children]; // pega os produtos do carrinho

  const allValues = products.map((eachProduct) => {
    const split = eachProduct.innerText.split(' '); 
    const lastSplit = split[split.length - 1];
    return lastSplit;
  });

  const result = allValues.reduce((acc, curr) =>
  acc + parseFloat(curr.replace('$', '')), 0);
  // console.log(result);
  return (Number(result.toFixed(2)));
};

// atualiza os valores do Sub-total
function getPrices() {
  cartSpan.innerHTML = totalSum();
}

const total = () => {
  totalSum();
  getPrices();
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// remove o produto clicado no carrinho
function cartItemClickListener(event) {
  const selected = event.target;
  // cart = document.querySelector('.cart__items');
  cart.removeChild(selected);
  saveCartItems(cart.innerHTML); // salva o carrinho atualizado no local storage
  total();
}

// dps de recarregar a página, os produtos perdem a função de deletar ao clicar no mesmo. (infos vindas do local storage)
function deleteFromLocalStorage() {
  const carProducts = [...cart.children]; // pega cada item 
  carProducts.forEach((element) => element.addEventListener('click', cartItemClickListener));
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addLoading() {
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerText = 'carregando...';
  container.appendChild(div);
}

function removeLoading() {
  const message = document.querySelector('.loading');
  message.remove(); // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
}

// função para add o produto selecionado no carrinho.
async function addItemToCart(event) {
  // cart = document.querySelector('.cart__items');
  const getId = event.target.parentNode.firstChild.innerText;
  addLoading();
  const produto = await fetchItem(getId);
  cart.appendChild(createCartItemElement(produto));
  saveCartItems(cart.innerHTML); // salva o carrinho atualizado no local storage
  removeLoading();
  total();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addBtn.addEventListener('click', addItemToCart); // add evento no botão
  section.appendChild(addBtn);
  return section;
}

// adiciona os produtos na página html
async function createCardItems() {
  const section = document.querySelector('.items');
  addLoading();
  const products = await fetchProducts('computador');
  const { results } = products; 
    results.forEach((element) => {
      section.appendChild(createProductItemElement(element));
    });
    removeLoading();
}

// recarrega os produtos do carrinho ao atualizar a página
function returnInfosFromLocalStorage() {
  cart.innerHTML = localStorage.getItem('cartItems');
  total();
}

function emptyCart() {
const button = document.querySelector('.empty-cart');
button.addEventListener('click', () => {
  cart.innerHTML = ''; 
  saveCartItems(cart.innerHTML); // salva o carrinho atualizado no local storage
  total();
});
}

window.onload = () => {
  createCardItems();
  getSavedCartItems();
  returnInfosFromLocalStorage();
  deleteFromLocalStorage();
  emptyCart();
 };
