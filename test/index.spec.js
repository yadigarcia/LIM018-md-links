// const mdLinks = require('../index.js');
const {
  ruteExist,
  getAbsoluteRoute,
  ruteExtension,
  getLinks,
  validateStatus,
} = require("../index.js");

const testRoute = ".\\fileDoc\\prueba1.md";
const testRouteFalse = ".\fileDocprueba1.md";
const testRouteAbs = "D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\prueba1.md";

const testArrayLinks = [
  {
    href: "https://es.wikipedia.org/wiki/Markdown",
    text: "Markdown",
    routeF: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
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
    expect(getLinks(testRoute)).toEqual(testArrayLinks);
  });
});

describe("validateStatus", () => {
  it("is a function", () => {
    expect(typeof validateStatus).toBe("function");
  });

  const promiseTestArray = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      routeF: "D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md",
      linksStatus: 200,
      message: "ok",
    },
  ];

  it("deberia obtener un array de links", () => {
    return expect(validateStatus(testArrayLinks)).resolves.toEqual(
      promiseTestArray
    );
  });

  it("deberia obtener un array de links", () => {
    return validateStatus(testArrayLinks).then((result) => {
      expect(result).toBe(promiseTestArray);
    });
  });
});

// describe('mdLink', () => {

//   it('shoul.....', () => {
//    expect().resolves.toBe('');
//   });

// });
