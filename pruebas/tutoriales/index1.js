const express = require('express');
const colors = require('colors');

const server = express();

server.get('/', function (req,res){
    res.send('<h1> hola mundo con express y node </h1>');
    res.end();
});

server.listen(3000, function(){
    console.log('server on port 3000'.yellow);
});

// const http = require('http');

// const colors = require('colors');

// const handleServer = function (req,res){
//     res.writeHead(200,{'Content-type': 'text/html'});
//     res.write('<h1> Hola mundo </h1>');
//     res.end();
// }

// const server = http.createServer(handleServer);

// server.listen(3000, function(){
//     console.log('server on port 3000'.yellow);
// });

// const http = require('http');

// const handleServer = function (req,res){
//     res.writeHead(200,{'Content-type': 'text/html'});
//     res.write('<h1> Hola mundo </h1>');
//     res.end();
// }

// const server = http.createServer(handleServer);

// server.listen(3000, function(){
//     console.log('server on port 3000');
// });

// const http = require('http');

// http.createServer(function(req,res){
//     res.writeHead(404,{'Content-type': 'text/html'}); //codigo http servidor
//     res.write('<h1> Hola mundo </h1>');
//     res.end();
// }).listen(3000);

// const http = require('http');

// http.createServer(function(req,res){
//     res.writeHead(404,{'Content-type': 'text/plain'}); //codigo http servidor
//     res.write('Esto es un simple texto');
//     res.end();
// }).listen(3000);

// const fs = require('fs');

// fs.readFile('./texto.txt',function(err, data){
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// })


// fs.writeFile('./texto.txt', 'linea uno', function(err){
//     if (err){
//         console.log(er);
//     }
//     console.log('archivo creado');
// });

// console.log('ultima linea de codigo');



// const os = require('os');
 
// console.log(os.platform());
// console.log(os.release());
// console.log('La memoria libre:', os.freemem(), ' bytes');
// console.log('La memoria total:', os.totalmem(), 'bytes');

