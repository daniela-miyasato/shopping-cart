const getSavedCartItems = () => {
  localStorage.getItem('cartItems');
};
// https://www.w3schools.com/html/html5_webstorage.asp - na parte retrieve
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
