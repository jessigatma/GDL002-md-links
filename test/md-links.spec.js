const fileMd = require('../mdLinks.js');

test('should be a file Markdown', done => {
  function callback(data){
  expect(fileMd('texto.txt')).toBe(true);
  done();
  }
fetchData(callback);
});


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

