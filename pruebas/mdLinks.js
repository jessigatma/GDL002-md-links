const fs = require('fs');
const path = require('path');
let path1 = "./texto.txt";
let pathNew= process.argv[2];

function fileMd (pathNew){
fs.readdir(process.argv[2], function(err,data){
    //console.log(data);
     data.forEach(function(dat){
        if (path.extname(dat)=== '.txt'){
            console.log(dat);
            //console.log(path.extname(dat));
        }
    });
});
};
const fileOrDir = 
fs.lstat(path1, (err, stats) => {
    if(err)
        return console.log(err); //Handle error
    console.log(`Is file: ${stats.isFile()}`);
    console.log(`Is directory: ${stats.isDirectory()}`);
});

const fileExist = 
fs.access(path1, fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    return
  }
    console.log('file exists');
})

// if(path.isAbsolute(path1)) {
//    console.log('¡Es absoluta!');
// } else{
//     path.isRelative(path1)
// }
//////////////////////////////////////////
module.exports = {fileMd,
    fileOrDir, 
    fileExist}