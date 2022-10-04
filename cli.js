#!/usr/bin/env node
const process = require('process');
const { statsLinks } = require('./index.js');
const mdLinks = require('./mdLinks.js');
const gradient = require('gradient-string');
const figlet = require('figlet');
const clear = require('clear');
const console = require('console');

clear();

const pathFile = process.argv.filter(param => !(['--stats', '--validate'].includes(param)))[2];
const validate = process.argv.includes('--validate')
const stats = process.argv.includes('--stats')
const help = process.argv.includes('--help')



mdLinks(pathFile, { Option: validate, option: stats, option: help})
    .then((links) => {
        console.log(gradient('cyan', 'pink', 'red', 'green', 'blue')('Bienvenido a md-Link'))
        if (validate) {
            links.forEach((obj) => {
                
                //console.log(`\nhref: ${obj.href} \ntext: ${obj.text} \nfile: ${obj.file} \nstatus: ${obj.linksStatus} \nmessage: ${obj.message}`)
                console.table([ `href: ${obj.href}`, `text: ${obj.text}` ,`file: ${obj.file}` ,`status: ${obj.linksStatus}`, `message: ${obj.message}`])
            })

        } if (stats) {

            const optionStats = statsLinks(links)
            //console.log(` Total: ${optionStats.total} \n Unique:${optionStats.unique}`);
                   
            console.table([`Total: ${optionStats.total}`, `Unique:${optionStats.unique}`]);

        } if (validate && stats) {
            
            const optionStats = statsLinks(links)
            //console.log(` Broken:${optionStats.broken}`)
            console.table([ ` Broken:${optionStats.broken}`])

        } if (help){
            console.log('Digita  --validate  para conocer los links y/o \nDigita  --stats   para conocer las estadisticas de los links'.green)
        }

       
    })
    .catch((err) => console.log(err))



  
    