// const mdLinks = require('../index.js');
const {
  ruteExist,
  getAbsoluteRoute,
  ruteExtension,
  getLinks,
  validateStatus,
  statsLinks,
  findFileInDirectory
} = require("../index.js");
const fetch = require("node-fetch");

jest.mock('node-fetch');

const testRoute = ".\\fileDoc\\prueba1.md";
const testRouteFalse = ".\fileDocprueba1.md";
const testRouteAbs = "D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\prueba1.md";
const testDirectory = ".\\fileDoc";

const testArrayLinks = [
  {
    href: "https://es.wikipedia.org/wiki/Markdown",
    text: "Markdown",
    file: "D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\prueba1.md",
  },
];

describe("ruteExist", () => {
  it("is a function", () => {
    expect(typeof ruteExist).toBe("function");
  });

  it("deberia confirmar si existe la ruta", () => {
    expect(ruteExist(testRoute)).toEqual(true);
  });

  it("deberia confirmar si NO existe la ruta", () => {
    expect(ruteExist(testRouteFalse)).toEqual(false);
  });
});


describe("ruteIsAbsolute", () => {
  it("is a function", () => {
    expect(typeof getAbsoluteRoute).toBe("function");
  });

  it("deberia confirmar si la ruta es Absoluta, sino convertirla a Absoluta", () => {
    expect(getAbsoluteRoute(testRoute)).toEqual(testRouteAbs);
  });

  it("deberia devolverla ruta es Absoluta, prque se recibio como tal", () => {
    expect(getAbsoluteRoute(testRouteAbs)).toEqual(testRouteAbs);
  });
});


describe("ruteExtension", () => {
  it("is a function", () => {
    expect(typeof ruteExtension).toBe("function");
  });

  it("deberia confirmar si existen archivos .md", () => {
    expect(ruteExtension(testRoute)).toEqual(".md");
  });
});


describe("getLinks", () => {
  it("is a function", () => {
    expect(typeof getLinks).toBe("function");
  });

  it("deberia obtener un array de links", () => {
    expect(getLinks(testRouteAbs)).toEqual(testArrayLinks);
  });
});


describe("validateStatus", () => {
  it("is a function", () => {
    expect(typeof validateStatus).toBe("function");
  });

  const testArrayLinks = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
    },
  ];

  const promiseResolve = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
      linksStatus: 200,
      message: "ok",
    },
  ];

  const testArrayLinksFail = [
    {
      href: "https://es.wikipedia.org/wiki/Madown",
      text: "Markdown",
      file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
    },
  ];

  const promiseReject = [
    {
      href: "https://es.wikipedia.org/wiki/Madown",
      text: "Markdown",
      file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
      message: "fail",
    },
  ];

  it("deberia obtener un array de links con status ok ", (done) => {
    Promise.all(validateStatus(testArrayLinks)).then((response) =>
      expect(response).toEqual(promiseResolve))
    done();
  });


  

  it("deberia obtener un array de links con status fail", (done) => {
 
    fetch.mockImplementation(() => Promise.reject(
      {
        message: "fail",
      }
    ))
       Promise.all(validateStatus(testArrayLinksFail))
      .then((res) => {
        expect(res).toEqual(promiseReject);
        done();
      });
   });
});

describe("findFileInDirectory", () => {
    it("is a function", () => {
      expect(typeof findFileInDirectory).toBe("function");
    });
  
 

  it('deberia poder recorer el directorio', ()=> {
    
    const arrayDirectory = 
    [
      'fileDoc\\fileDocII\\prueba3.md',
      'fileDoc\\fileDocII\\prueba4.md',
      'fileDoc\\prueba1.md',
      'fileDoc\\prueba2.md'
    ]

  const x = findFileInDirectory(testDirectory)

    expect(x).toEqual(arrayDirectory)
  })
  });


describe("statsLinks", () => {
  it("is a function", () => {
      expect(typeof statsLinks).toBe("function");
  });
  
    const promiseResolve = [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
        file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
        linksStatus: 200,
        message: "ok",
      },
      {
        href: "https://es.wikipedia.org/wiki/Isabel_II_del_Reino_Unido",
        text: "Isabel II del Reino Unido",
        file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
        linksStatus: 200,
        message: "ok",
      },
      {
        href: "https://es.wikipedia.org/wiki/Isabel_II_del_Reino_Unido",
        text: "Isabel II del Reino Unido",
        file: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
        linksStatus: 404,
        message: "fail",
      },
    ];

    const objLinksStats = {"total": 3, "unique": 2, "broken": 1,}

  it("deberia devolverme un objeto con la cantidad de links", () => {
      expect(statsLinks(promiseResolve)).toEqual(objLinksStats);
    })

});
