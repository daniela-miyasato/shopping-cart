const saveCartItems = (myShoppingCart) => {
  localStorage.setItem('cartItems', myShoppingCart);
};
// https://www.w3schools.com/html/html5_webstorage.asp
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
