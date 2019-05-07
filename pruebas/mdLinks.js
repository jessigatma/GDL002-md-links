const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

//let readAllFile;

//Me dice si mi link es archivo o directorio
const fileOrDirectory = pathName => {
  return new Promise((resolve, reject) => {
    fs.lstat(pathName, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      }
      if (stats.isDirectory()) {
        console.log(`${pathName} Es un directorio`);
        return true;
      }
      if (stats.isFile()) {
        console.log(`${pathName} Es un archivo`);
        //console.log(path.resolve(pathName));
        resolve(stats.isFile());
      }
    });
  });
};

// Me muestra los archivos con la extensión md
const findFileMd = pathName => {
  fs.readdir(pathName, function (err, data) {
    //console.log(err,data);
    data.forEach(function (dat) {
      if (path.extname(dat) === '.md') {
        console.log('En este directorio existen los siguientes archivos con extensión .md: ' + dat);
        return true;
        //console.log(path.extname(dat));
      }
    });
  });
}

//Muestra si la ruta es absoluta
const absolutePath = pathName => {
  if (path.isAbsolute(pathName)) {
    console.log('path is absolute');
    return true;
  } else {
    console.log('path is not absolute');
    return false;
  }
};

const readFileMd = pathName => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, 'utf8', function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data); {
       
    });
  }); //promise
}

const pathStatus = (pathName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log('Links encontrados: ');
      readAllFile = lookForLinks(pathName, data);
      //console.log(readAllFile);
      for (let i = 0; i < returnArray.length; i++) {
        fetch(pathName[i].href).then(response => {
          if (response.status == 200) {
            console.log(
              `File: ${pathName}\n Text:${returnArray[i].text}\n Link: ${
              returnArray[0].href
            }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          } else if (response.status == 404 || response.status == 400) {
            console.log(
              `File: ${pathName}\n Text:${returnArray[i].text}\n Link: ${
              returnArray[0].href
            }\n Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          }
        });
      }
    });
  });
}


const linksStats = (pathName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      console.log(`File: ${pathName} has:`);
      readAllFile = lookForLinks(pathName, data);

      let wrongLinks = 0;
      let rightLinks = 0;
      for (let i = 0; i < readAllFile.length; i++) {
        fetch(readAllFile[i].href).then(response => {
          if (response.status == 200) {
            rightLinks++;
          } else if (response.status == 404 || response.status == 400) {
            wrongLinks++;
          } else {
            console.log('error', response.status);
          }
          if (wrongLinks + rightLinks === readAllFile.length) {
            console.log(`File: ${pathName} has:`);
            console.log(`✔ Total Links: ${readAllFile.length}`);
            console.log(`✔ Total Unique Links: ${rightLinks}`);
            console.log(`✖ Total Broken links: ${wrongLinks}\n`);
          }
        });
      }
    });
  });
}


module.exports = {
  fileOrDirectory,
  findFileMd,
  absolutePath,
  readFileMd
};

//[prueba](https://comosonklmikar.com)
// const readFileMd = pathName => {
//   fs.readFile(pathName, 'utf8', function (err, data) {
//      if (err) {
//        return (err);
//      }{
//      const regExpText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; // /g es global
//      const regExpLink = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
//      //console.log(total);
//      const textMatch = data.match(regExpText); //cada línea hace match con regExpText
//      const linkMatch = data.match(regExpLink);
//      let returnArray = [];
//      for (let i = 0; i < linkMatch.length; i++) {
//        let linkData = {
//          href: linkMatch[i],
//          text: textMatch[i],
//          file: pathName,
//        };
//        returnArray.push(linkData);
//      }
//    //console.log(returnArray);
//    for (let i = 0; i < returnArray.length; i++) {
//        fetch(returnArray[i].href).then(response => {
//          if (response.status == 200) {
//            console.log(
//              `File: ${pathName}\n Text:${returnArray[i].text}\n href: ${
//                returnArray[0].href
//              }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
//            );
//          } else if (response.status == 404 || response.status == 400) {
//            console.log(
//              `File: ${pathName}\n Text:${returnArray[i].text}\n href: ${
//                returnArray[0].href
//              }\n Response code: ${response.status}\n Response: ${response.statusText}\n`,
//            );
//          }
//        });
//      }
//     }
   
//    });
// }