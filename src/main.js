const importFiles = require('./mdLinks.js')
const pathName = process.argv[2];
const options = process.argv[3];

importFiles.findFileMd('.');
importFiles.fileOrDirectory(pathName);
importFiles.absolutePath(pathName);
importFiles.readFileMd(pathName);
importFiles.pathsStatus(pathName);
importFiles.linksStats(pathName);
//importFiles.menuOptions(options);

