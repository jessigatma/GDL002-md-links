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