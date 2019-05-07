const http = require('http')
const https = require('https')

const url = process.argv[2]
const prefix = url.substring(0,8)

if(prefix === 'https://'){
    https.get(url,function(response){
        response.setEncoding('utf8')
        response.on('data',function(data){
            console.log(data);
        })
    })
} else {
    http.get(url, function(response){
        response.setEncoding('utf8')
        response.on('data',function(data){
            console.log(data);
        })
    })
}

// const http = require('http');
// const url = process.argv[2];

// http.get(url,function(response){
//     response.setEncoding('utf8')
//     response.on('data', console.log)
//     response.on('error', console.error)
// }).on('error',console.error)



// var http = require('http')
// var url = process.argv[2]
 
// http.get(url, function (response) {
//   response.on('data', function (data) {
//     console.log(data.toString());
//   })
// })
