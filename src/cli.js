const {mdLinks} = require ('./index.js');

// console.log('hola, funciona por favor', mdLinks);

mdLinks('src/prueba.md')
.then(res => console.log("esta es la respuesta", res))
.catch(error => console.error("este es el error", error))
