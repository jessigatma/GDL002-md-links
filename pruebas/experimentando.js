//////////////////////////////validate.js
const fetch = require('node-fetch');
import { lookUpForLinks } from './links.js';

export const validateLink = route => {
  const linksObj = lookUpForLinks(route);
  const newArr = linksObj.map(links => new Promise((resolve) => {
    const validatingUrl = fetch(links.href);
    validatingUrl.then(response => {
      if (response.status >= 200 && response.status < 400) {
        links.status = response.status;
        links.message = response.statusText;
        resolve(links);
      } else {
        links.status = response.status;
        links.message = 'Fail';
        resolve(links);
      }  
    }).catch(err => {
      links.status = 'No contiene una URL válida';
      links.message = 'Fail',
      resolve(links);
    });
  }));
  return Promise.all(newArr);
};
///////////////////////////// ./Links.js
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
/////////////////////////////// path.js
const path = require('path');
const fs = require('fs');

export const walkInDirectorySync = route => {
  let arrOfFiles = [];
  if (fs.statSync(route).isFile()) {
    arrOfFiles.push(route);
  } else {
    const contentArr = fs.readdirSync(route);
    contentArr.forEach(files => {
      const routeAbsFile = path.join(route, files);
      arrOfFiles = [...arrOfFiles, ...(walkInDirectorySync(routeAbsFile))];
    }); 
  };
  return arrOfFiles;
};

export const filterMdFiles = contentArr => {
  return contentArr.filter(file => path.extname(file).toLowerCase() === '.md');
};
////////////////// stats.js
import { validateLink } from './validate.js';

const doStats = (resolver, route) => (
  new Promise((resolve, reject) => {
    const linkStatus = validateLink(route);
    linkStatus.then(response => {
      const result = resolver(response);
      resolve(result);
    }).catch(err => reject(err)); 
  })
);
 
export const totalLinksStats = (route) => {
  const resolver = response => `Total: ${response.length}`;
  return doStats(resolver, route);
};

export const uniqueLinksStats = route => {
  const resolver = response => `Unique: ${new Set(response.map(uniqueLinks => uniqueLinks.href)).size}`;
  return doStats(resolver, route);
};

export const brokenLinksStats = route => {
  const resolver = response => `Broken: ${response.filter(statusText => statusText.message === 'Fail').length}`;
  return doStats(resolver, route);
};
