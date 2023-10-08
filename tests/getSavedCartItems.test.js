const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('Verifica se ao executar getSavedCartItems chama o localStorage.getItem', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Verifica se ao executar getSavedCartItems chama o localStorage.getItem com `cartItem` como parâmetro', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItem');
  });
});
