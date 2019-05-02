const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

let file = './README.md';
let pathNew = process.argv[2];

//Me dice si mi link es archivo o directorio
function fileOrDir() {
  fs.lstat(file, (err, stats) => {
    if (err)
      return console.log(err); //Handle error
    console.log(`Is file: ${stats.isFile()}`);
    console.log(`Is directory: ${stats.isDirectory()}`);
  });
}

//Me dice si existe o no el archivo
function fileExist() {
  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('file exists');

    if (path.resolve(file)) {
      console.log(path.resolve(file));
    }
  })
}

// Me muestra los archivos con la extensión md
function fileMd(pathNew) {
  fs.readdir(pathNew, function (err, data) {
    //console.log(err,data);
    data.forEach(function (dat) {
      if (path.extname(dat) === '.md') {
        console.log(dat);
        return true;
        //console.log(path.extname(dat));
      }
    });
  });
}

//Lee el archivo md encontrado 
function readFileMd(pathNew) {
  fs.readFile(pathNew, 'utf8', function (err, contents) {
    if (err) {
      return console.log(err)
    } {
      const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; // /g es global
      const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      console.log('------READ FILE.MD-------');

      const allLinks = contents.match(mdLinkRgEx); //cada línea hace match con mdLinkRgEx
      const urlArray = contents.match(mdLinkRgEx2);
      console.log(`File name: ${pathNew}\n`);
      console.log(urlArray);
      if (urlArray != null) {
        for (let i = 0; i < urlArray.length; i++) {
          console.log(`Text: ${allLinks[i]}\n 
                       Link:${urlArray[i]}\n 
                       File: ${pathNew}\n`)
          //callback(urlArray, allLinks, newPath)
        }
      }
    }
    //readCompletePath(newPath);
  })
}

module.exports={fileOrDir,
  fileExist,
  fileMd,
  readFileMd
};