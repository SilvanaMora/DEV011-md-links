const mdLinks = require('../src/index.js');
const readArchive=require('../src/functions.js');//llamamos lo que queremnos analizar
const {validateLinks} = require('../src/functions.js');
const {linksTotales} = require('../src/functions');
const axios = require('axios');
describe ('Esta constante tiene una promesa',() =>{
  it('Debería devolver false si la función no tiene una promesa', () => {
    const tiene =(readArchive) =>{};
  expect(tiene.then).not.toBeDefined();
  });

  
});

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


const mockAxios = {
  get: jest.fn(),
};

jest.mock('axios');
describe('validateLinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Valida enlaces y devolver un array actualizado con estados', async () => {
    const mockLinks = [
      { href: 'https://example.com/page1' },
      { href: 'https://example.com/page2' },
    ];

    const mockResponses = [
      { status: 200, statusText: 'OK' },
      { status: 404 },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponses[0]));
    axios.get.mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }));

    const result = await validateLinks(mockLinks);

    expect(result).toEqual([
      {
        href: 'https://example.com/page1',
        status: 200,
        statusText: 'OK',
        ok: 'ok',
      },
      {
        href: 'https://example.com/page2',
        status: 404,
        statusText: 'Not Found',
        ok: 'fail',
      },
    ]);
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith('https://example.com/page1');
    expect(axios.get).toHaveBeenCalledWith('https://example.com/page2');
  });

  it('debe tener array vacio y devuelve array vacio', async () => {
    const result = await validateLinks([]);

    expect(result).toEqual([]);
    expect(axios.get).not.toHaveBeenCalled();
  });
});