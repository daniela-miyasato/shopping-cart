const fetchProducts = async (product) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  
  try {
    const response = await fetch(url); // retorna informações com metadados.
    const data = await response.json(); // '.json' transforma em objeto javascript (sem metadados)
    return data;
  } catch (error) {
    console.log(`Tem um erro aqui! \n${error}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
