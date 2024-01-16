const path = require("path"); // importé modulo path
const fs = require("fs");
const marked = require("marked");
const { JSDOM } = require("jsdom");
const axios = require("axios");

const converAbsolute = (pathUser) =>
  // console.log('cómo llega el path: ', pathUser);
  path.isAbsolute(pathUser) ? pathUser : path.resolve(pathUser); // si es absoluta devulve absoluta y sino es, conviertela
const pathUserExist = (pathUser) => fs.existsSync(pathUser);

const isMd = (
  pathUser //funcion para ver si es MD
) => path.extname(pathUser) === ".md";

const readArchive = (pathUser) => {
  //funcion para leer el archivo
  return new Promise((resolve, reject) => {
    fs.readFile(pathUser, "utf-8", (err, data) => {
      //usamos metodo readfile
      if (err) {
        reject("Error al leer el archivo");
      } else {
        resolve(data);
      }
    });
  });
};

const extractLinks = (data, pathUser) => {
  //funcion para extraer enlaces

  const html = marked.parse(data);
  const dom = new JSDOM(html); //convertir html a un objeto DOM
  const nodeListA = dom.window.document.querySelectorAll("a");

  const enlacesExtraidos = []; //alamcenamos los enlaces extraidos  en un arreglo

  nodeListA.forEach((anchor) => {
    //itera sobre los elementos
    enlacesExtraidos.push({
      href: anchor.href,
      text: anchor.textContent,
      file: pathUser,
    }); //agrega href del enlace al arreglo
  });

  return enlacesExtraidos; //devulve el arreglo de enlaces
};

const validateLinks = (enlacesExtraidos) => {
  // crear una funcion que valide los links
  //recibe un parametro un array de objetos
  // itera el array para obtener los enlaces que
  //->//estan en el objeto con la key (href)
  // validar la key con consultas http como axios, fetch etc
  // retornar un objeto con las propiedades {...ob, status, statusText}
  //retornarmos un array de promesas con Promises.all(array)
  const newArrayEnlaces = enlacesExtraidos.map((link) => {
    return axios
      .get(link.href)
      .then((result) => {
        return {
          ...link,
          status: result.status,
          statusText: result.statusText,
        };
      })
      .catch((err) => {
        return { ...link, status: err.status, statusText: err.statusText };
      });
  });
  return Promise.all(newArrayEnlaces);
};

//para estadisticas hito 4
const linksTotales = (array) => { 
  const numLinks = array.length; //cuenta los enlaces totales
  let unique = []; // crea arreglo para almacenar enlaces unicos  
  array.forEach((link) => { //itera sobre los enlaces y agrega los únicos al arreglo unique
    if (!unique.includes(link.href)) { //comprueba si el enlacce ya está en el arreglo
      unique.push(link.href); //si no estsa lo agrega 
    }
  });
  const broken = array.filter((item) => item.status !== 200); //filtra enlacws rotos
  return { totalLinks: numLinks, rotos: broken.length, unicos: unique.length }; //devuelve el obejto con las estadisticass 
};

module.exports = {
  converAbsolute,
  pathUserExist,
  isMd,
  readArchive,
  extractLinks,
  validateLinks,
  linksTotales,
};
