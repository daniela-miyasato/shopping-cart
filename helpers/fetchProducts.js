const fetchProducts = async (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  
  try {
    const response = await fetch(url); // retorna informações com metadados.
    const data = await response.json(); // '.json' transforma em objeto javascript (sem metadados)
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
