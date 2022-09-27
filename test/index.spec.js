// const mdLinks = require('../index.js');
const {
  ruteExist,
  getAbsoluteRoute,
  ruteExtension,
  getLinks,
  validateStatus,
} = require("../index.js");

const fetch = jest.mock('node-fetch');

const testRoute = ".\\fileDoc\\prueba1.md";
const testRouteFalse = ".\fileDocprueba1.md";
const testRouteAbs = "C:\\Users\\Toshiba\\md\\LIM018-md-links\\fileDoc\\prueba1.md";

const testArrayLinks = [
  {
    href: "https://es.wikipedia.org/wiki/Markdown",
    text: "Markdown",
    routeF: "C:\\Users\\Toshiba\\md\\LIM018-md-links.\\fileDoc\\prueba1.md",
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

  const testArrayLinks = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      routeF: "C:\\Users\\Toshiba\\md\\LIM018-md-links.\\fileDoc\\prueba1.md",
    },
  ];

  const promiseResolve = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      routeF: "C:\\Users\\Toshiba\\md\\LIM018-md-links.\\fileDoc\\prueba1.md",
      linksStatus: 200,
      message: "ok",
    },
  ];
  const promiseReject = [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      routeF: "C:\\Users\\Toshiba\\md\\LIM018-md-links.\\fileDoc\\prueba1.md",
      linksStatus: 404,
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
        status:404,
        message: 'fail',
      }
    ))

    Promise.all(validateStatus(testArrayLinks))
      .then((res) => {
        expect(res).toEqual(promiseReject);
      });
  });
});


// describe('mdLink', () => {

//   it('shoul.....', () => {
//    expect().resolves.toBe('');
//   });

// });
