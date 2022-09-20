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
const ruteIsAbsolute= (route) =>{
  (path.isAbsolute(route))
  ?route
  :path.resolve(route)

  return ruteIsAbsolute;
  }

// PARA SABER LA EXTENSION
const ruteExtension = (route) =>{(path.extname(route))
  // ?console.log("existen archivos .md".green)
  // :console.log("NO existen archivos .md".red) 
 // return ruteExtension;
  };


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
 const validateStatus = () => {
  const arrayLinks = getLinks(testRoute) // preguntar como obtener el array como parametro
  arrayLinksPromises = [];
  arrayLinks.forEach((objL) => {
    const httpLink = objL.href
    // console.log(httpLink)
    const x = fetch(httpLink)
    .then((promiseFetch) =>{
      console.log(
      linksStatus = promiseFetch.status,
      linksMessage = promiseFetch.statusText)
    })
    .catch((err) => {
      err.message = err.message
    });
   console.log('status',arrayLinksPromises.push(x));
   console.log(x);
 });

 };
console.log(validateStatus);








 

// PROMESA
const mdLink = (route) =>
  new Promise((resolve, reject) => {
    ruteExist(route);
    ruteIsAbsolute(route);
    ruteExtension (route);
    getLinks(route);
    validateStatus();
    resolve([]);
 });

mdLink(testRoute)
  .then((result) =>{ 
    // console.log(result) 
  });





 module.exports ={
  ruteExist,
  ruteIsAbsolute,
  ruteExtension ,
  getLinks,
 };

// module.exports = {
//   ruteExist
// };
