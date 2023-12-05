const {mdLinks} = require ('..//index.js')
mdLinks('/no existe/').then(()=>{})
.catch((error) => {
    console.log(error)
})