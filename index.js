const fs = require("fs");
const path = require("node:path");
const fetch = require("node-fetch");
const { resolve } = require("path");

// SABER SI LA RUTA EXISTE
const ruteExist = (route) => fs.existsSync(route);

// SABER SI LA RUTA ES ABSOLUTA
const getAbsoluteRoute = (route) => {
  // getAbsoluteRoute

  if (path.isAbsolute(route)) {
    return route;
  }
  return path.resolve(route);
};

// PARA SABER LA EXTENSION
const ruteExtension = (route) => path.extname(route);

// PARA EXTRAER LON LINK DEL ARCHIVO MD
const getLinks = (route) => {
  const arrayLinks = [];

  // PARA LEER EL ARCHIVO
  const ruteRead = fs.readFileSync(route, "utf8");

  if (ruteRead !== "") {
    const urlFind = ruteRead.match(/\[.*\]\(.*\)/gm);

    if (urlFind !== "null") {
      urlFind.map((url) => {
        const text = url.slice(1, url.indexOf("]"));
        const href = url.slice(url.indexOf("]") + 2, url.indexOf(")"));
        const file = route;
        const objLiks = {
          href,
          text,
          file,
        };
        arrayLinks.push(objLiks);
      });
    }
  }
  return arrayLinks;
};

// FUNCION VALIDATE
const validateStatus = (arrayLinks) => {
  newArrayPromises = [];
  arrayLinks.forEach((objL) => {
    const httpLink = objL.href;
    // console.log(httpLink)
    const promise = fetch(httpLink)
      .then((promiseFetch) => {
        return {
          // href: objL.href,
          // text: objL.text,
          ...objL,
          linksStatus: promiseFetch.status,
          message: "ok",
        };
      })
      .catch((err) => {
       // console.log('error aki', err);
        return {
          ...objL,
          // linksStatus: err.status,
          message: "fail",
        };
      });
    newArrayPromises.push(promise);
  });
  return newArrayPromises;
};

// FUNCION STATS
const statsLinks = (newArrayPromises) => {

  const total = newArrayPromises.length;
  const unique = newArrayPromises.filter((objLi) => objLi.message === 'ok').length;
  const broken = newArrayPromises.filter((objLi) => objLi.message ==='fail').length;

  return {
    total,
    unique,
    broken,
  };
};

// RECORRER DIRECTORIO, RECURSIVIDAD
//const routeDirectory = path.join(__dirname + "/fileDoc");

const findFileInDirectory = (routeDirectory) => {
  const arrayFiles = [];

  const readDirectory = fs.readdirSync(routeDirectory);
  
  readDirectory.forEach((files) => {
    const newRoutedirectory = path.join(routeDirectory, files);

    if (fs.statSync(newRoutedirectory).isDirectory()) {
      findFileInDirectory(newRoutedirectory).forEach((file) => {
        arrayFiles.push(file);
      });
    } else if (ruteExtension(newRoutedirectory) === ".md") {
      //console.log(newRoutedirectory)
      arrayFiles.push(newRoutedirectory);
    }
  });
  return arrayFiles;
};


module.exports = {
  ruteExist,
  getAbsoluteRoute,
  ruteExtension,
  getLinks,
  validateStatus,
 // mdLinks,
  statsLinks,
  findFileInDirectory
};
