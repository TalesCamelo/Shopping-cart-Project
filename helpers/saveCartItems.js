const saveCartItems = (value) => {
  localStorage.setItem('cartItem', JSON.stringify(value));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
