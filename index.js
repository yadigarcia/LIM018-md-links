const fs = require('fs') 
const path = require('node:path')  
const fetch = require('node-fetch')
var colors = require('colors');

// RUTA1
const testRoute = '.\\fileDoc\\prueba1.md'

 // SABER SI LA RUTA EXISTE
const ruteExist = (route) => fs.existsSync(route);
    // ?console.log("El archivo EXISTE!".green)
    // :console.log("El archivo NO EXISTE!".red)
    //console.log(ruteExist)


 // SABER SI LA RUTA ES ABSOLUTA
const getAbsoluteRoute= (route) =>{ // getAbsoluteRoute

  if (path.isAbsolute(route)) {
    return route
  }
  return path.resolve(route) 
}

// PARA SABER LA EXTENSION
const ruteExtension = (route) => (path.extname(route));
  


// PARA EXTRAER LON LINK DEL ARCHIVO MD
const getLinks = (route)  => {
  const arrayLinks = [];

  // PARA LEER EL ARCHIVO
  const ruteRead = fs.readFileSync(testRoute, 'utf8');
 
  if (ruteRead !== ''){
    const urlFind = ruteRead.match(/\[.*\]\(.*\)/gm);
  
    if(urlFind !== 'null'){
      urlFind.map( (url) => { 
      const text = url.slice(1, url.indexOf(']'));
      const href = url.slice(url.indexOf(']') +2, url.indexOf(')'));
      const routeF = __dirname + route;
      const objLiks ={
        href,
        text,
        routeF,
      }
         arrayLinks.push(objLiks);
     })
    }
  }
  return arrayLinks;
}


// FUNCION VALIDATE
 const validateStatus = (arrayLinks) => {
  // preguntar como obtener el array como parametro
  newArrayPromises = [];
  arrayLinks.forEach((objL) => {
    const httpLink = objL.href
    // console.log(httpLink)
    const promise = fetch(httpLink)
    .then((promiseFetch) =>{
      return {
        // href: objL.href,
        // text: objL.text,
        ...objL,
        linksStatus: promiseFetch.status,
        message: 'ok'
      }
    })
    .catch((err) => {
     
      return {
        ...objL,
        message: 'fail'
      }
    });
    newArrayPromises.push(promise);
   
   });
   return newArrayPromises
 };

// FUNCION STATS 

const stats = (arrayLinks) => {
const total = arrayLinks.length;
const unique = arrayLinks.length;
const broken = arrayLinks.filter(objLi => objLi.message === 'fail').length;
  return{
    total,
    unique,
    broken,
  }; 
};




// PROMESA
const mdLink = (route) =>
  new Promise((resolve, reject) => {
    ruteExist(route);
    getAbsoluteRoute(route);
    ruteExtension (route);
    const arrayLinks = getLinks(route) 
    const arrayPromises = validateStatus(arrayLinks);
    //console.log(arrayPromises);
    Promise.all(arrayPromises).then(res => {
      //console.log(res); 
    });
    stats(arrayLinks);
    console.log(stats(arrayLinks)); 
    resolve([]);
 });

mdLink(testRoute)
  .then((result) =>{ 
    // console.log(result) 
  });





 module.exports ={
  ruteExist,
  getAbsoluteRoute,
  ruteExtension ,
  getLinks,
  validateStatus,
 };


