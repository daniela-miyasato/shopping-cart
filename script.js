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

// função para add o produto selecionado no carrinho.
async function addItemToCart(event) {
  console.log('testando');
  const olCart = document.querySelector('.cart__items');
  const getId = event.target.parentNode.firstChild.innerText;
  const produto = await fetchItem(getId);
  olCart.appendChild(createCartItemElement(produto));
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botaoAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botaoAdd.addEventListener('click', addItemToCart);
  section.appendChild(botaoAdd);

  return section;
}
 
// adiciona os produtos na página html
async function createCardItems() {
  const section = document.querySelector('.items');
  const products = await fetchProducts('computador');
  const { results } = products; 

  results.forEach((element) => {
    section.appendChild(createProductItemElement(element));
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// precisa pegar os botoes de "adicionar ao carrinho" de cada item
// function buttonFunction() {
//   const allAddBtn = [...document.getElementsByClassName('item__add')];
//   console.log(allAddBtn);
//   allAddBtn.forEach((element) => {
//     element.addEventListener('click', addItemToCart);
//   });
// }

window.onload = () => {
  createCardItems();
  // buttonFunction();
 };
