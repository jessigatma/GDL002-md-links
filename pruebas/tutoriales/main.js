const mymodule = require ('./module');

 const ext = process.argv[3];
 const ruta = process.argv[2];

mymodule(ruta, ext, (err,resp)=>{
    console.log(resp.join('\n'));
});


// var filterFn = require('./solution_filter.js')
//     var dir = process.argv[2]
//     var filterStr = process.argv[3]

//     filterFn(dir, filterStr, function (err, list) {
//       if (err) {
//         return console.error('There was an error:', err)
//       }

//       list.forEach(function (file) {
//         console.log(file)
//       })
//     })

