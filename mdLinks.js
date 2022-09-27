const fs = require("fs");
var colors = require("colors");

const {
    ruteExist,
    getAbsoluteRoute,
    ruteExtension,
    getLinks,
    validateStatus,
    findFileInDirectory
} = require("./index.js");



// PROMESA
const mdLinks = (route) =>
  //console.log(route)
  new Promise((resolve, reject) => {
    if (ruteExist(route)) {
      //console.log("hola", ruteExist(route));

      const routeAbs = getAbsoluteRoute(route);
      //console.log("abs", routeAbs);

      if (fs.statSync(routeAbs).isDirectory()) {
        //console.log('directory')
        const arrayLinks = findFileInDirectory(routeAbs);

        const arrayPromises = arrayLinks.map((link) => mdLinks(link));
        Promise.all(arrayPromises).then((resultado) => resolve(resultado.flat()));

        //console.log(arrayPromises);
      } else if (fs.statSync(routeAbs).isFile()) {
        //console.log('is file',fs.statSync(routeAbs).isFile());

        if (ruteExtension(routeAbs) === ".md") {
          //console.log("ext", ruteExtension(routeAbs));
        }

        const arrayLinks = getLinks(routeAbs);
        const arrayPromises = validateStatus(arrayLinks);

        Promise.all(arrayPromises).then((res) => {
          //console.log(res);
         
         // console.log(statsLinks(res));
          // res.then((resultado) => resolve([resultado]));
          resolve(res.flat());
        });
      }
    } else {
      reject("ruta no existe");
    }
  });



  // RUTA1
// const testRoute = ".\\fileDoc\\prueba1.md";
/*const testRoute = ".\\fileDoc";

mdLinks(testRoute).then((result) => {
  console.log(result);
});*/

  module.exports = mdLinks;