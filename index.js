const fs = require("fs");
const path = require("node:path");
const fetch = require("node-fetch");
var colors = require("colors");

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
        const routeF = __dirname + route;
        const objLiks = {
          href,
          text,
          routeF,
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
        console.log(err);
        return {
          ...objL,
          message: "fail",
        };
      });
    newArrayPromises.push(promise);
  });
  return newArrayPromises;
};

// FUNCION STATS
const stats = (newArrayPromises) => {
  const total = newArrayPromises.length;
  const unique = newArrayPromises.filter(
    (objLi) => objLi.message === "ok"
  ).length;
  const broken = newArrayPromises.filter(
    (objLi) => objLi.message === "fail"
  ).length;
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
  o;
};

//console.log(findFileInDirectory(routeDirectory));

// PROMESA
const mdLink = (route) =>
  new Promise((resolve, reject) => {
    if (ruteExist(route)) {
      //console.log("hola", ruteExist(route));

      const routeAbs = getAbsoluteRoute(route);
      //console.log("abs", routeAbs);

      if (fs.statSync(routeAbs).isFile()) {
        // console.log(fs.statSync(routeAbs).isFile());

        if (ruteExtension(routeAbs) === ".md") {
          //console.log("ext", ruteExtension(routeAbs));

          const arrayLinks = getLinks(routeAbs);
          const arrayPromises = validateStatus(arrayLinks);

          Promise.all(arrayPromises)
            .then((res) => {
              // console.log(res);
              stats(res);
              // console.log(stats(res));
            })
            .then((resultado) => resolve([resultado]));
        }
      } else {
        let promises = findFileInDirectory(routeAbs).forEach((link) => {
          // console.log(link)
          console.log(mdLink(link));
        });
        //console.log(mdLink(link))
        Promise.all(promises).then((resultado) => resolve(resultado));
      }
    } else {
      console.log("ruta no existe");
    }
    //resolve([]);
  });

// RUTA1
// const testRoute = ".\\fileDoc\\prueba1.md";
const testRoute = ".\\fileDoc";

mdLink(testRoute).then((result) => {
  //console.log(result)
});

module.exports = {
  ruteExist,
  getAbsoluteRoute,
  ruteExtension,
  getLinks,
  validateStatus,
};
