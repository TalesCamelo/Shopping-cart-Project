const saveLocal = () => {
  const toStorage = [];
  const values = document.querySelectorAll('.cart__item');
  values.forEach((e) => toStorage.push(e.innerText));
  return toStorage;
};

const saveLocalImg = () => {
  const toStorageImg = [];
  return toStorageImg;
}

const localInfo = JSON.parse(localStorage.getItem('cartItem'));

let totalValue = 0;
const cart = document.getElementsByClassName('cart')[0];
const totalPrice = document.createElement('p');
totalPrice.className = 'total-price';
totalPrice.innerText = `Total: ${totalValue}`;
cart.appendChild(totalPrice);

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const carrinhoTotal = () => {
  totalPrice.innerText = `Total: ${totalValue.toFixed(2)}`;
};


const cartPriceSum = (price) => {
      totalValue += price;
      carrinhoTotal();
  };

const cartPriceSub = (price) => {
  const cartList = document.querySelectorAll('.cart__item');
  if (cartList.length === 0) {
    totalValue = 0;
    carrinhoTotal();
  } else {
      totalValue -= price;
      carrinhoTotal();
  }
};

const cartItemClickListener = (event) => {
  const id = event.target;
  const price = parseFloat(id.innerText.split('$')[1]);
  id.remove();
  saveCartItems(saveLocal());
  cartPriceSub(price);
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.appendChild(createProductImageElement(thumbnail));
  li.addEventListener('click', cartItemClickListener);

  // localStorage.setItem('cartItemImg', JSON.stringify(thumbnail))
  console.log(thumbnail);
  return li;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */

const getIdFromProductItem = async (event) => {
  const id = event.target.parentNode.firstChild.innerText;
  const item = document.getElementsByClassName('cart__items')[0];
  const price = parseFloat(event.target.parentNode.children[3].innerText.split('$')[1]);

  const callFetchItem = await fetchItem(id);
  item.appendChild(createCartItemElement(callFetchItem));
  saveCartItems(saveLocal());
  cartPriceSum(price);
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
 const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__price', `Preço: $${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => element.addEventListener('click', getIdFromProductItem));

  return section;
};

// eslint-disable-next-line no-unused-vars
const emptyCart = () => {
  const cartToClear = document.getElementsByClassName('cart__items')[0];
  cartToClear.innerHTML = '';
  saveCartItems(saveLocal());
  totalValue = 0;
  carrinhoTotal();
};

const shopCart = () => {
  alert("Obrigado por comprar conosco!");
  emptyCart();
}

const createCartItemElementFromLocal = (element) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = element;
  // const teste = element.slice(4, 17);
  // console.log(teste);
  
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartValues = document.getElementsByClassName('cart__items')[0];
const sectionItems = document.getElementsByClassName('items')[0];

const getLocal = () => {
  localInfo.forEach((element) => {
    cartValues.appendChild(createCartItemElementFromLocal(element));
  });
};

const cartPriceInitial = () => {
  localInfo.forEach((element) => {
    totalValue += parseFloat(element.split('$')[1]);
    carrinhoTotal();
  });
};

window.onload = async () => {
  fetchProducts('computador').then((e) => {
    e.results.forEach((element) => sectionItems.appendChild(createProductItemElement(element)));
  });
  carrinhoTotal();
  if (localInfo !== null) {
   getLocal();
   cartPriceInitial();
  }
};
