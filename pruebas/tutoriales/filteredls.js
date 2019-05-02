const fs = require('fs');
const path = require('path');

const filtered =
fs.readdir(process.argv[2], function(err,data){
     data.forEach(function(dat){
        if (path.extname(dat)=== '.' + process.argv[3]){
            console.log(dat);
        }
    });
});


















// const fs = require('fs');
// const path = require('path');

// const filtered =
// fs.readdir(process.argv[2], function(err,data){
//     data.filter(function(dat){
//              return path.extname(dat)=== '.' + process.argv[3]; })
//     .forEach(function(dat){console.log(dat)});
// });

// var fs = require('fs')
// var path = require('path')

// var folder = process.argv[2]
// var ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err)
//   files.forEach(function (file) {
//     if (path.extname(file) === ext) {
//       console.log(file)
//     }
//   })
// })
