#!/usr/bin/env node

const {mdLinks} = require('./index.js');

const ruta=process.argv[2]; // para leer los datos que esta proporcionando el usuario 
const validate=process.argv.includes('--validate'); //asignamos el valor de la expresion a la variable
const stats=process.argv.includes('--stats'); 
console.log(ruta, validate, stats)


mdLinks(ruta, validate, stats)
.then(res => console.log("esta es la respuesta", res))
.catch(error => console.log("este es el error", error))

