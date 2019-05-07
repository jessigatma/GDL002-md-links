const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');
let readAllFiles;

//------------ME MUESTRA LOS ARCHIVO CON EXTENSIÓN MD-------------
const findFileMd = pathName => {
  fs.readdir(pathName, function (err, data) {
    data.forEach(function (dat) {
      if (path.extname(dat) === '.md') {
        console.log(chalk.magenta(`En este directorio existen los siguiente archivos con extensión md: ${dat} \n`));
        return true;
      }
    })
  })
};


//------------ME DICE SI MI PATH ES UN ARCHIVO O UN DIRECTORIO--------------
const fileOrDirectory = pathName => {
  return new Promise((resolve, reject) => {
    fs.lstat(pathName, (err, stats) => { //fs.lstat checa la existencia de un archivo
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      }
      if (stats.isDirectory()) {
        console.log(chalk.yellowBright(`${pathName} Es un directorio \n`));
        return true;
      }
      if (stats.isFile()) {
        console.log(chalk.greenBright(`${pathName} Es un archivo \n`));
        resolve(stats.isFile());
      }
    });
  });
};

//-------------ME DICE SI MI RUTA ES ABSOLUTA O NO--------------
const absolutePath = pathName => {
  if (path.isAbsolute(pathName)) {
    console.log(chalk.magenta('La ruta es absoluta'));
    return true;
  } else {
    console.log(chalk.magenta('la ruta NO es absoluta'));
    return false;
  }
};

//--------BUSCA LOS LINKS POR MEDIO DE EXPRESIONES REGULARES Y LOS PONE EN UN ARREGLO-----------------
const lookForLinks = (pathName, data) => {
  const regExpText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; // /g es global
  const regExpLink = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
  const total = data.toString();
  const textMatch = total.match(regExpText); //cada línea hace match con regExpText
  const linkMatch = total.match(regExpLink);
  let returnArray = [];
  for (let i = 0; i < linkMatch.length; i++) {
    let linkData = {
      href: linkMatch[i],
      text: textMatch[i],
      file: pathName,
    };
    returnArray.push(linkData);
  }
  return returnArray
};

//----------------LEE EL ARCHIVO Y ME ARROJA LOS LINKS ENCONTRADOS EN LOOKFORLINKS----------
const readFileMd = (pathName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log('Links encontrados:');
      myProcData = lookForLinks(pathName, data);
      // console.log(myProcData);
    });
  });
};

//--------------------MUESTRA EL STATUS DE LOS LINKS OBTENIDOS -----------
const pathsStatus = (pathName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      readAllFiles = lookForLinks(pathName, data);
      for (let i = 0; i < readAllFiles.length; i++) {
        fetch(readAllFiles[i].href).then(response => {
          if (response.status == 200) {
            console.log(chalk.blue(
              `Archivo: ${pathName}\n Texto:${readAllFiles[i].text}\n href: ${
               readAllFiles[i].href
             }\n  Código de Respuesta: ${response.status}\n Respuesta: ${response.statusText}\n`,
            ));
          } else if (response.status == 404 || response.status == 400) {
            console.log(chalk.yellow(
              `Archivo: ${pathName}\n Texto:${readAllFiles[i].text}\n href: ${
               readAllFiles[i].href
             }\n Código de Respuesta: ${response.status}\n Respuesta: ${response.statusText}\n`,
            ));
          }
        });
      }
    })
  })
};

//----------- MUESTRA EL TOTAL DE LINKS  ENCONTRADOS (ESTADÍSTICAS DE LINKS)------------------
const linksStats = (pathName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log(`File: ${pathName} tiene:`);
      readAllFiles = lookForLinks(pathName, data);
      let wrongLinks = 0;
      let rightLinks = 0;
      for (let i = 0; i < readAllFiles.length; i++) {
        fetch(readAllFiles[i].href).then(response => {
          if (response.status == 200) {
            rightLinks++;
          } else if (response.status == 404 || response.status == 400) {
            wrongLinks++;
          } else {
            console.log('error', response.status);
          }
          if (wrongLinks + rightLinks === readAllFiles.length) {
            console.log(`File: ${pathName} tiene:`);
            console.log(chalk.magenta(`✔ Total de Links: ${readAllFiles.length}`));
            console.log(chalk.green(`✔ Total de Links funcionando: ${rightLinks}`));
            console.log(chalk.red(`✖ Total de Links rotos: ${wrongLinks}\n`));
          }
        });
      }
    })
  })
}

function menuOptions() {
  if (options === '--validate') {
    console.log(readFileMd(pathName));
  } else if (options === '--stats') {
    //  stats.statsLinks(urlArray);
    console.log(pathsStatus(pathName));
  } else if (options === '--validate--stats') {
    //  stats.validateStats(urlArray);
    console.log(linksStats(pathName));
  }
}

module.exports = {
  findFileMd,
  fileOrDirectory,
  absolutePath,
  lookForLinks,
  readFileMd,
  pathsStatus,
  linksStats
  //menuOptions
}
