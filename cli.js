const process = require('process');
const mdLinks = require('./index.js');
const gradient = require('gradient-string');
const figlet = require('figlet');
const clear = require('clear');
 clear();

const pathFile = process.argv.filter(param => !(['--stats', '--validate'].includes(param)));
const optionValidate = process.argv.includes('--validate')
const statsValidate = process.argv.includes('--stats')


//console.log(pathFile,optionValidate,statsValidate);
const testRoute = ".\\fileDoc";
// mdLinks(testRoute).then((result) => {
//   console.log(result);
// });
console.log(mdLinks('./fileDoc'));

// mdLinks(pathFile, { validate:optionValidate})
// .then((link) =>{
//     console.log(gradient('cyan', 'pink','red', 'green', 'blue')('Bienvenido a md-Link'))
// })
















// //console.log(gradient('cyan', 'pink','red', 'green', 'blue')('Hello world!'));

// figlet('Hello World!!', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(gradient('cyan', 'pink','red', 'green', 'blue')(data))
// });