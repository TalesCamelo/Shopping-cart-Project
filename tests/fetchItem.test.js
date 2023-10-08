require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se fetch é chamada caso fetchItem(`MLB1615760527`)', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se em fetchItem(`MLB1615760527`), a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Verifica se fetchItem(`MLB1615760527`) retorna o objeto esperado', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Verifica se fetchItem() retorna o erro `You must provide an url`', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});
