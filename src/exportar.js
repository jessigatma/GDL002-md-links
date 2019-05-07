const hola = require('./mdLinks.js')
const pathName = process.argv[2];

hola.findFileMd('.');
hola.fileOrDirectory(pathName);
hola.absolutePath(pathName);
hola.readFileMd(pathName);

// //hola.linksStatus(pathName);

// //hola.readPathStatus(pathName);
// // hola.fileExist();

// // hola.readFileMd('README.md');

