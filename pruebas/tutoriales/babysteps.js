const numero = 
    process.argv
    .slice(2)
    .reduce(function(a, b){
        return a + Number(b);
    },0); //0 es el valor inicial

console.log(numero);


// var result = 0

//     for (var i = 2; i < process.argv.length; i++) {
//       result += Number(process.argv[i])
//     }

//     console.log(result)
