const {
  converAbsolute,
  pathUserExist,
  isMd,
  readArchive,
  extractLinks,
  validateLinks,
  linksTotales,
} = require("./functions");

function mdLinks(path, validate, stats) {
  //path:ruta del archivo a procesar /validate  Un booleano que indica si se debe realizar una validación del archivo.
  //stats: Un objeto con estadísticas opcionales.
  return new Promise((resolve, reject) => {
    const rutaConvertida = converAbsolute(path); //convierte de relativa a absoluta

    const isOk = pathUserExist(rutaConvertida); //comprueba si la ruta existe
    if (!isOk) {
      reject("La ruta no existe"); //si no existe rutaConvertida, se rechaza
    }
    const isMarkdown = isMd(rutaConvertida);
    if (!isMarkdown) {
      reject("no es MD");
    }

    readArchive(rutaConvertida) //tura convertida como argumento
      .then((resData) => {
        //resdata contiene los datos leidos del archivo
        const links = extractLinks(resData, rutaConvertida); //extrae los enlaces del archivo

        validateLinks(links) //valida los enlaces
          .then((arrayLinks) => {
            //dManeja el resultado exitoso de la validación de enlaces:, Se ejecuta cuando la promesa de validateLinks se resuelve con éxito.
            //arrayLinks: Contiene el array de enlaces válidos.
            if (validate) {
              resolve(arrayLinks); // Resuelve la promesa principal con las estadístic,  Indica que la operación ha finalizado con éxito y devuelve los resultados.
            } else if (stats) {
              // Comprueba si se han solicitado estadísticas Si la opción stats es true, se procede a validar y procesar los enlaces para generar estadísticas
              const prueba2 = linksTotales(arrayLinks); // Genera estadísticas de enlaces:  Llama a la función linksTotales (probablemente definida en otra parte) para generar estadísticas sobre los enlaces válidos.
              // prueba2: Almacena el resultado de la generación de estadísticas.
              resolve(prueba2); // Resuelve la promesa principal con las estadístic,  Indica que la operación ha finalizado con éxito y devuelve los resultados.
            } else {
              // Si no se han solicitado estadísticas: Resuelve la promesa principal directamente con los enlaces extraídos.
              resolve(links); // Indica que la operación ha finalizado con éxito y devuelve los enlaces.
            }
          });
      })
      .catch((err) => {
        // Se ejecuta si la promesa de readArchive se rechaza con un error. err: Contiene el error producido durante la lectura del archivo.
        reject(err);
      });
  });
}

module.exports = {
  mdLinks,
};
