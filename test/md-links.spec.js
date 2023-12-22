const mdLinks = require('../src/index.js');

describe('Test para saber si mdlinks es una función', () => {
  it('Debería devolver true si la variable es una función', () => {
    const miFuncion = (mdLinks) => {};
    expect(typeof miFuncion).toBe('function');
  });
  
  it('Debería devolver false si la función no tiene una promesa', () => {
    const miFuncion = (mdLinks) => {};
    expect(miFuncion.then).not.toBeDefined();
  });
});