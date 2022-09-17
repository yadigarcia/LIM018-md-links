const fs = require('fs') 
const path = require('node:path')  
var colors = require('colors');

// RUTA1
const testRoute = '.\\fileDoc\\prueba1.md'

 // SABER SI LA RUTA EXISTE
const ruteExist = (route) => fs.existsSync(route);
    // ?console.log("El archivo EXISTE!".green)
    // :console.log("El archivo NO EXISTE!".red)
    console.log(ruteExist)


 // SABER SI LA RUTA ES ABSOLUTA
const ruteIsAbsolute= (route) =>{
  (path.isAbsolute(route))
  ?route
  :path.resolve(route)

  return ruteIsAbsolute;
  }

// PARA SABER LA EXTENSION
const ruteExtension = (route) =>{
  (path.extname(route))
  // ?console.log("existen archivos .md".green)
  // :console.log("NO existen archivos .md".red) 
  return ruteExtension;
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
        return arrayLinks.push(objLiks);

     })
    }
  }
  return getLinks;
 }














 

// PROMESA
const mdLink = (route) =>
  new Promise((resolve, reject) => {
    ruteExist(route);
    ruteIsAbsolute(route);
    ruteExtension (route);
    getLinks(route);
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



