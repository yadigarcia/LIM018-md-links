const fs = require('fs') 
const path = require('node:path')  
const fetch = require('node-fetch')
var colors = require('colors');

// RUTA1
const testRoute = '.\\fileDoc\\prueba1.md'

 // SABER SI LA RUTA EXISTE
const ruteExist = (route) => fs.existsSync(route);
   
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
const stats = (newArrayPromises) => {

const total = newArrayPromises.length;
const unique = newArrayPromises.filter(objLi => objLi.message === 'ok').length;
const broken = newArrayPromises.filter(objLi => objLi.message === 'fail').length;
  return{
    total,
    unique,
    broken,
  }; 
};


// RECORRER DIRECTORIO, RECURSIVIDAD
const directory = './fileDoc'
  const findFileInDir = (directory)=> {
    if(fs.statSync(directory).isDirectory()){
      console.log('hola')
      const dirSearch = fs.readdirSync(directory)

      dirSearch.forEach((files) =>{
        console.log(files)
       findFileInDir(files);
       
      })
    }else{
      console.log('no es directorio');// pregunta si existe directorio

 }
}

findFileInDir(directory);



// PROMESA
const mdLink = (route) =>
  new Promise((resolve, reject) => {
    ruteExist(route);
    getAbsoluteRoute(route);
    ruteExtension (route);

    const arrayLinks = getLinks(route) 
    const arrayPromises = validateStatus(arrayLinks);

    Promise.all(arrayPromises).then(res => {
        // console.log('arriba',res)
      stats(res);
      // console.log(stats(res)) 
    });
  
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


