const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

let readAllFile;

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

const lookForLinks = (pathName) => {
  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) {
      return console.log(err);
    } {
      const total = data.toString();
      const regExpText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; // /g es global
      const regExpLink = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      //console.log(total);
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
    }
  })
};


const readFileMd = pathName => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
      //readAllFile = lookForLinks(pathName, data);
      console.log(readAllFile);
    });
  });
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
      for (let i = 0; i < readAllFile.length; i++) {
        fetch(pathName[i].href).then(response => {
          if (response.status == 200) {
            console.log(
              `File: ${pathName}\n Text:${readAllFile[i].text}\n Link: ${
                readAllFile[0].href
              }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
            );
          } else if (response.status == 404 || response.status == 400) {
            console.log(
              `File: ${pathName}\n Text:${readAllFile[i].text}\n Link: ${
                readAllFile[0].href
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

// const fs = require('fs');
// const path = require('path');
// const fetch = require('node-fetch');

// let path1 = "./texto.txt";
// let pathNew = process.argv[2];
// let file = './README.md';

// function fileMd(pathNew) {
//   fs.readdir(pathNew, function (err, data) {
//     //console.log(err,data);
//     data.forEach(function (dat) {
//       if (path.extname(dat) === '.md') {
//         console.log(dat);
//         return true;
//         //console.log(path.extname(dat));
//       }
//     });
//   });
// }

// function fileOrDir() {
//   fs.lstat(file, (err, stats) => {
//     if (err)
//       return console.log(err); //Handle error
//     console.log(`Is file: ${stats.isFile()}`);
//     console.log(`Is directory: ${stats.isDirectory()}`);
//   });
// }

// function fileExist() {
//   fs.access(file, fs.F_OK, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log('file exists');

//     if (path.resolve(file)) {
//       console.log(path.resolve(file));
//     }
//     // else{
//     //     path.isRelative(path1)
//     // }
//   })
// }

// function readFileMd(newPath) {
//   fs.readFile(newPath, 'utf8', function (err, contents) {
//     if (err) {
//       return console.log(err)
//     } {
//       // extrae el texto del link
//       const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; // /g es global
//       const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
//       console.log('------READ FILE.MD-------');

//       const allLinks = contents.match(mdLinkRgEx); //cada línea hace match con mdLinkRgEx
//       const urlArray = contents.match(mdLinkRgEx2);
//       console.log(`File name: ${newPath}\n`);
//       if (urlArray != null) {
//         for (let i = 0; i < urlArray.length; i++) {
//           fetch(urlArray[i])
//             .then(res => {
//               if (res.status == 200) {
//                 console.log(`Text: ${allLinks[i]}\n Link:${urlArray[i]}\nFile: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
//               } else if (response.status == 404 || response.status == 400) {
//                 console.log(`Error.\nText: ${allLink[i]}\nLink: ${urlArray[i]}\nFile: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
//               }
//             })
//           //callback(urlArray, allLinks, newPath)
//         }
//       }
//     }
//     //readCompletePath(newPath);
//   })
// }

// // function checkStatus(res) {
// //   if (res.ok) { // res.status >= 200 && res.status < 300
// //     return res;
// //   } else {
// //     throw MyCustomError(res.statusText);
// //   }
// // }



// module.exports = {
//   fileMd,
//   readFileMd,
//   fileOrDir,
//   fileExist,
// };

