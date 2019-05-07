const {findFileMd,
  fileOrDirectory,
  absolutePath,
  lookForLinks,
  readFileMd,
  pathsStatus,
  linksStats}= require('../src/main')

test('should be a file Markdown', done => {
  function callback(data){
  expect(findFileMd('README.md')).toBe(true);
  done();
  }
fetchData(callback);
});

// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
