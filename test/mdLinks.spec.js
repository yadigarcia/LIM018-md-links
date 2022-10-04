const mdLinks = require("../mdLinks")

const resultMdLinks = [
  {
    href: 'https://www.youtube.com/watch?v=UtIbUxxnABI&t=2995s',
    text: 'Coldplay',
    file: 'D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\fileDocII\\prueba3.md',
    linksStatus: 200,
    message: 'ok'
  },
  {
    href: 'https://www.youtube.com/watch?v=k2qgadSvNyU',
    text: 'Dua Lipa',
    file: 'D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\fileDocII\\prueba3.md',
    linksStatus: 200,
    message: 'ok'
  },
  {
    href: 'https://es.wikipedia.org/wiki/JavaScript',
    text: 'JavaScrip',
    file: 'D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\fileDocII\\prueba4.md',
    linksStatus: 200,
    message: 'ok'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\prueba1.md',
    linksStatus: 200,
    message: 'ok'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Isabel_II_del_Reino_Unido',
    text: 'Isabel II del Reino Unido',
    file: 'D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\prueba2.md',
    linksStatus: 200,
    message: 'ok'
  }
];

  
  
describe('MDLINKS', ()=>{
    it('mdLinks', ()=>{
        expect(typeof mdLinks).toBe('function')        
    })

    const route = ".\\fileDoc";

    it('deberia devolverme un array de objetos con status', (done)=>{

      mdLinks(route).then(res => {
        //console.log('aquiresolve',res);
        expect(res).toEqual(resultMdLinks)
        done();
        
      })
     
       
    })

    it('deberia mostarme un array con 1 objeto de file', (done)=>{
    const routeFile = ".\\fileDoc\\prueba1.md";
    const arrayFile =  [ 
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'D:\\LABORATORIA\\LIM018-md-links\\fileDoc\\prueba1.md',
      linksStatus: 200,
      message: 'ok'
    }
  ];

    mdLinks(routeFile).then(res => {
      //console.log('aquiresolve',res);
      expect(res).toEqual(arrayFile)
      done();
       })
    })
    const routeFail = ".\\fileDo"
    const resultReject = "Por favor ingresa una ruta valida"

    it('deberia mostar mensaje de ruta no existe', (done)=>{
    mdLinks(routeFail).then(res => {
    
      expect(res).toEqual(resultReject)
      done();
    });
  })
});