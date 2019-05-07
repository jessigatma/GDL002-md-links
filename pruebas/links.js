const fs = require('fs');
const path = require('path');

import { walkInDirectorySync, filterMdFiles } from './path.js';

export const lookUpForLinks = (routes) => {
  let linksOfFile = [];
  const filesArr = walkInDirectorySync(routes);
  const mdFiles = filterMdFiles(filesArr);
  mdFiles.forEach(paths => {
    const readMdFiles = fs.readFileSync(paths, 'utf-8');
    const regex = /(^|[^!])\[(.*)\]\((.*)\)/gm;
    let matchLinks = regex.exec(readMdFiles);
    while (matchLinks !== null) {
      linksOfFile.push({
        href: matchLinks[3], 
        text: matchLinks[2].slice(0, 50),
        file: path.resolve(paths)
      }); 
      matchLinks = regex.exec(readMdFiles); 
    }
  });
  return linksOfFile;
};