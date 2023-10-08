const fetchProducts = async (query) => {
  const urlBase = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  if (query === undefined) {
    throw new Error('You must provide an url');
  }
  const request = await fetch(urlBase);
  const response = await request.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}