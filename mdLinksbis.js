const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

let path1 = "./texto.txt";
let pathNew = process.argv[2];
let file = './README.md';

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

function fileOrDir() {
  fs.lstat(file, (err, stats) => {
    if (err)
      return console.log(err); //Handle error
    console.log(`Is file: ${stats.isFile()}`);
    console.log(`Is directory: ${stats.isDirectory()}`);
  });
}

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
    // else{
    //     path.isRelative(path1)
    // }
  })
}

function readFileMd(newPath) {
  fs.readFile(newPath, 'utf8', function (err, contents) {
    if (err) {
      return console.log(err)
    } {
      // extrae el texto del link
      const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; // /g es global
      const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      console.log('------READ FILE.MD-------');

      const allLinks = contents.match(mdLinkRgEx); //cada línea hace match con mdLinkRgEx
      const urlArray = contents.match(mdLinkRgEx2);
      console.log(`File name: ${newPath}\n`);
      if (urlArray != null) {
        for (let i = 0; i < urlArray.length; i++) {
          fetch(urlArray[i])
            .then(res => {
              if (res.status == 200) {
                console.log(`Text: ${allLinks[i]}\n Link:${urlArray[i]}\nFile: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
              } else if (response.status == 404 || response.status == 400) {
                console.log(`Error.\nText: ${allLink[i]}\nLink: ${urlArray[i]}\nFile: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
              }
            })
          //callback(urlArray, allLinks, newPath)
        }
      }
    }
    //readCompletePath(newPath);
  })
}

// function checkStatus(res) {
//   if (res.ok) { // res.status >= 200 && res.status < 300
//     return res;
//   } else {
//     throw MyCustomError(res.statusText);
//   }
// }



module.exports = {
  fileMd,
  readFileMd,
  fileOrDir,
  fileExist,
};
