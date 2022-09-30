#!/usr/bin/env node
const process = require('process');
const { statsLinks } = require('./index.js');
const mdLinks = require('./mdLinks.js');
const gradient = require('gradient-string');
const figlet = require('figlet');
const clear = require('clear');
clear();

const pathFile = process.argv.filter(param => !(['--stats', '--validate'].includes(param)))[2];
const validate = process.argv.includes('--validate')
const stats = process.argv.includes('--stats')



mdLinks(pathFile, { Option: validate, option: stats })
    .then((links) => {
        console.log(gradient('cyan', 'pink', 'red', 'green', 'blue')('Bienvenido a md-Link'))
        if (validate) {
            links.forEach((obj) => {
                
                console.log("true2", `\nhref: ${obj.href} \ntext: ${obj.text} \nfile: ${obj.routeF} \nstatus: ${obj.linksStatus} \nmessage: ${obj.message}`)
            })

        } if (stats) {

            const optionStats = statsLinks(links)

            console.log(optionStats.total, optionStats.unique)


        } if (validate && stats) {
            
            const optionStats = statsLinks(links)
            console.log(optionStats.broken)
        }

    })
    .catch((err) => console.log(err))






/*
const [, , ...args] = process.argv;
//node console.log(`Hello ${args}`)

if(args.length === 0){
    console.error('Ingresar la ruta del archivo o directorio');
}
if(args.length === 1){
    mdLinks(pathFile, { validate }) 
    .then((result)=> console.log('args1', result));
    console.log('2')
}

if(args.length === 2){
switch(pathFile){
    case '--validate':
        mdLinks(pathFile, validate )
        .then((result)=> console.log('validate', result))
        .catch((err)=> console.log('error', err));
        break;
     
    case '--stats':
        mdLinks(pathFile, stats )
        .then((result)=> console.log('stats', result))
        .catch((err)=> console.log('error', err));
        break;
}
   
}
  */