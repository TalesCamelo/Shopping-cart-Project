const fetchItem = async (itemId) => {
  const urlBase = `https://api.mercadolibre.com/items/${itemId}`;
  if (itemId === undefined) {
    throw new Error('You must provide an url');
  }
  const request = await fetch(urlBase);
  const response = await request.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
