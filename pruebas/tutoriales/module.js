const fs = require('fs');
const path = require('path');
    
// const ruta = process.argv[2];
// const ext = process.argv[3];

module.exports = function (ruta, ext, callback){
        fs.readdir(ruta, function(err,data){
            if (err) return callback(err);
            let response = data.filter((dat) => path.extname(dat)=== `.${ext}`);
            return callback(null, response);
        });
    };



    
    // var fs = require('fs')
    // var path = require('path')

    // module.exports = function (dir, filterStr, callback) {
    //   fs.readdir(dir, function (err, list) {
    //     if (err) {
    //       return callback(err)
    //     }

    //     list = list.filter(function (file) {
    //       return path.extname(file) === '.' + filterStr
    //     })

    //     callback(null, list)
    //   })
    // }