const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('Verifica se saveCartItems(`cartItem`) chama o localStorage.setItem', () => {
    saveCartItems('cartItem')
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Verifica se saveCartItems(`cartItem`) chama no localStorage.setItem a chave e o valor corretamente', () => {
    const valor = '';
    saveCartItems(valor)
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', valor)
  })
});
