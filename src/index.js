const {converAbsolute, pathUserExist, isMd, readArchive, extractLinks, validateLinks, linksTotales} = require("./functions");



function mdLinks (path,validate,stats) {
  return new Promise ((resolve, reject) => {
  
  const rutaConvertida = converAbsolute(path);
  
  const isOk = pathUserExist(rutaConvertida)
  if(!isOk){
    reject('La ruta no existe')
  }
  const isMarkdown = isMd(rutaConvertida)
  if(!isMarkdown) {
    reject('no es MD')
  }
 

  readArchive(rutaConvertida)
      .then((resData) => {
      const links = extractLinks(resData, rutaConvertida) 
        if (stats) {

          validateLinks(links)  
          .then((arrayLinks)=> {
            const prueba2 = linksTotales(arrayLinks)
            resolve(prueba2)
          }).catch(data =>{
            resolve(data)
         })
        }else{
          resolve(links);
          }

      })
      .catch((err) => {
        reject(err);
      });
  });


}


  
module.exports = {
  mdLinks
};



