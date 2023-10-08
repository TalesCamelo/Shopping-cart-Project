require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Verifica se fetch é chamada caso fetchProducts(`computador`)', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se em fetchProducts(`computador`), a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
  it('Verifica se fetchProducts(`computador`) retorna o objeto esperado', async () => {
    expect(await fetchProducts(`computador`)).toEqual(computadorSearch);
  })
  it('Verifica se fetchProducts() retorna o erro `You must provide an url`', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
