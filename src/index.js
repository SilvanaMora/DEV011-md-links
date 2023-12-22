const {converAbsolute, pathUserExist, isMd, readArchive, extractLinks, validateLinks} = require("./functions");



function mdLinks (path,validate=false) {
  return new Promise ((resolve, reject) => {
  
  const rutaConvertida = converAbsolute(path);
  
  const isOk = pathUserExist(rutaConvertida)
  if(isOk===false){
    reject('La ruta no existe')
  }
  const isMarkdown = isMd(rutaConvertida)
  if(isMarkdown===false) {
    reject('no es MD')
  }
 
  readArchive(rutaConvertida)
      .then((resData) => {
      const links = extractLinks(resData, rutaConvertida) 
        // resolve(links);
        if (validate) {
          validateLinks(links)  
          .then((arrayLinks)=> {
            resolve(arrayLinks);
          }).catch(data =>{
            resolve(data)
          })
        }else{
          resolve(links)
        }
      })
      // .then ((linksPar) =>{
       
      //   // console.log({prueba,links})
      //   //return validateLinks(links)
      // })
      .catch((err) => {
        reject(err);
      });
  });
  

}


  
module.exports = {
  mdLinks
};



