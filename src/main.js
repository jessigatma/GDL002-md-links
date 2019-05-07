const importFiles = require('./mdLinks.js')
const pathName = process.argv[2];

importFiles.findFileMd('.');
importFiles.fileOrDirectory(pathName);
importFiles.absolutePath(pathName);
importFiles.readFileMd(pathName);
importFiles.pathsStatus(pathName);
importFiles.linksStats(pathName);

//http://eureka.com/