// const mdLinks = require('../index.js');
const {
  ruteExist,
  ruteIsAbsolute,
  ruteExtension ,
  getLinks,} = require('../index.js');

const testRoute = '.\\fileDoc\\prueba1.md'
const testRouteFalse = '.\fileDoc\prueba1.md'
const testRouteAbs = 'D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md';


describe("ruteExist", () => {
  it('is a function', () => {
    expect(typeof ruteExist).toBe('function');
  });

  it('deberia confirmar si existe la ruta', ()=>{
    expect(ruteExist(testRoute)).toEqual(true)
  });

  it('deberia confirmar si NO existe la ruta', ()=>{
    expect(ruteExist(testRouteFalse)).toEqual(false)
  })
});


describe("ruteIsAbsolute", () => {
  it('is a function', () => {
    expect(typeof ruteIsAbsolute).toBe('function');
  });

  it('deberia confirmar si la ruta es Absoluta, sino convertirla a Absoluta', ()=>{
    expect(ruteIsAbsolute(testRoute)).toEqual(testRouteAbs);
  })
});

describe("ruteExtension", () => {
  it('is a function', () => {
    expect(typeof ruteExtension).toBe('function');
  });

  it('deberia confirmar si existen archivos .md', ()=>{
    expect(ruteExtension.resolve(testRoute)).toEqual('.md');
    ;
  })
});
console.log('test', ruteExtension(testRoute))
describe("getLinks", () => {
  it('is a function', () => {
    expect(typeof getLinks).toBe('function');
  });

  const testArrayLinks = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      routeF: 'D:\\LABORATORIA\\LIM018-md-links.\\fileDoc\\prueba1.md'
    }
  ];

  it('deberia obtener un array de links', ()=>{
    expect(getLinks(testRoute)).toEqual(testArrayLinks);
  })
});






// describe('mdLink', () => {

//   it('shoul.....', () => {
//    expect().resolves.toBe('');
//   });

// });